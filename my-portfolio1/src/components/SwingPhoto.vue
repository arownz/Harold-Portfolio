<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";

const photoSrc = "/meself2.jpg";

/** Viewport position (px), fixed layer — drag / throw anywhere on screen */
const x = ref(0);
const y = ref(0);
const vx = ref(0);
const vy = ref(0);
const rotation = ref(0);
const angularVelocity = ref(0);

const dragging = ref(false);
let grabDx = 0;
let grabDy = 0;

const isDesktop = ref(false);
let mq: MediaQueryList | null = null;
let mqHandler: (() => void) | null = null;

let raf = 0;
let lastTs = 0;
let lastMoveT = 0;
let lastPx = 0;
let lastPy = 0;

const PHOTO_W = 220;
const PHOTO_H = 288;
const PAD = 10;

const GRAVITY = 1550;
const LINEAR_DRAG = 1.85;
const ANGULAR_DRAG = 4.2;
const RESTITUTION = 0.72;
const GROUND_FRICTION = 0.88;
const MAX_SPEED = 4200;
const SLEEP_EPS = 12;

function syncDesktop() {
  if (mq) isDesktop.value = mq.matches;
}

function vw() {
  return window.innerWidth;
}
function vh() {
  return window.innerHeight;
}

function clampToBounds(nx: number, ny: number) {
  const maxX = vw() - PHOTO_W - PAD;
  const maxY = vh() - PHOTO_H - PAD;
  return {
    x: Math.min(Math.max(PAD, nx), Math.max(PAD, maxX)),
    y: Math.min(Math.max(PAD, ny), Math.max(PAD, maxY)),
  };
}

function placeInitial() {
  if (vw() < PHOTO_W + PAD * 2 || vh() < PHOTO_H + PAD * 2) return;
  x.value = Math.max(PAD, vw() - PHOTO_W - 28);
  y.value = Math.max(PAD, (vh() - PHOTO_H) / 2);
  vx.value = 0;
  vy.value = 0;
  rotation.value = 0;
  angularVelocity.value = 0;
}

function clampStateToBounds() {
  const c = clampToBounds(x.value, y.value);
  x.value = c.x;
  y.value = c.y;
}

function onPointerDown(e: PointerEvent) {
  if (!isDesktop.value) return;
  grabDx = e.clientX - x.value;
  grabDy = e.clientY - y.value;
  dragging.value = true;
  vx.value = 0;
  vy.value = 0;
  angularVelocity.value *= 0.3;
  lastMoveT = performance.now();
  lastPx = x.value;
  lastPy = y.value;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
}

function onPointerMove(e: PointerEvent) {
  if (!isDesktop.value || !dragging.value) return;
  let nx = e.clientX - grabDx;
  let ny = e.clientY - grabDy;
  const c = clampToBounds(nx, ny);
  nx = c.x;
  ny = c.y;

  const now = performance.now();
  const dt = Math.max((now - lastMoveT) / 1000, 1e-4);
  const ddx = nx - lastPx;
  const ddy = ny - lastPy;
  vx.value = ddx / dt;
  vy.value = ddy / dt;
  angularVelocity.value += (ddx / dt) * 0.00035;
  angularVelocity.value = Math.max(-14, Math.min(14, angularVelocity.value));

  lastMoveT = now;
  lastPx = nx;
  lastPy = ny;
  x.value = nx;
  y.value = ny;
}

function onPointerUp(e: PointerEvent) {
  if (!isDesktop.value || !dragging.value) return;
  dragging.value = false;
  try {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  } catch {
    /* ignore */
  }
  const sp = Math.hypot(vx.value, vy.value);
  if (sp > MAX_SPEED) {
    const s = MAX_SPEED / sp;
    vx.value *= s;
    vy.value *= s;
  }
}

function tick(ts: number) {
  if (!lastTs) lastTs = ts;
  const dt = Math.min((ts - lastTs) / 1000, 1 / 30);
  lastTs = ts;

  if (isDesktop.value && !dragging.value) {
    const W = vw();
    const H = vh();

    vy.value += GRAVITY * dt;
    vx.value *= Math.exp(-LINEAR_DRAG * dt);
    vy.value *= Math.exp(-LINEAR_DRAG * 0.35 * dt);
    angularVelocity.value *= Math.exp(-ANGULAR_DRAG * dt);

    let nx = x.value + vx.value * dt;
    let ny = y.value + vy.value * dt;
    let nrot = rotation.value + angularVelocity.value * dt;

    if (nx < PAD) {
      nx = PAD;
      vx.value = -vx.value * RESTITUTION;
      angularVelocity.value += vx.value * 0.0004;
    } else if (nx + PHOTO_W > W - PAD) {
      nx = W - PAD - PHOTO_W;
      vx.value = -vx.value * RESTITUTION;
      angularVelocity.value -= vx.value * 0.0004;
    }

    if (ny < PAD) {
      ny = PAD;
      vy.value = -vy.value * RESTITUTION;
    } else if (ny + PHOTO_H > H - PAD) {
      ny = H - PAD - PHOTO_H;
      vy.value = -vy.value * RESTITUTION;
      vx.value *= GROUND_FRICTION;
      angularVelocity.value *= 0.92;
      if (Math.abs(vy.value) < 140) vy.value = 0;
    }

    const speed = Math.hypot(vx.value, vy.value);
    if (speed > 80) {
      const bank = Math.atan2(vy.value, vx.value + 1e-6) * 0.12;
      nrot += (bank - nrot) * 0.08;
    }

    x.value = nx;
    y.value = ny;
    rotation.value = nrot;

    if (
      speed < SLEEP_EPS &&
      Math.abs(vy.value) < 8 &&
      ny + PHOTO_H >= H - PAD - 2
    ) {
      vx.value = 0;
      vy.value = 0;
      angularVelocity.value *= 0.85;
      if (Math.abs(angularVelocity.value) < 0.02) angularVelocity.value = 0;
      if (Math.abs(rotation.value) < 0.01) rotation.value = 0;
      else rotation.value *= 0.94;
    }
  }

  raf = requestAnimationFrame(tick);
}

function onResize() {
  syncDesktop();
  if (isDesktop.value) clampStateToBounds();
}

watch(isDesktop, (ok) => {
  if (!ok) {
    dragging.value = false;
  } else {
    void nextTick(placeInitial);
  }
});

onMounted(() => {
  mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
  mqHandler = () => syncDesktop();
  isDesktop.value = mq.matches;
  mq.addEventListener("change", mqHandler);
  window.addEventListener("resize", onResize);

  lastTs = performance.now();
  void nextTick(placeInitial);
  raf = requestAnimationFrame(tick);
});

onUnmounted(() => {
  if (mq && mqHandler) mq.removeEventListener("change", mqHandler);
  window.removeEventListener("resize", onResize);
  cancelAnimationFrame(raf);
});
</script>

<template>
  <!-- Desktop only (see isDesktop): mobile/tablet render nothing -->
  <Teleport to="body">
    <div
      v-if="isDesktop"
      class="swing-photo-layer pointer-events-none fixed inset-0 z-[850]"
      aria-hidden="true"
    >
      <div
        class="pointer-events-auto fixed left-0 top-0 cursor-grab rounded-2xl border-[3px] border-brand bg-s1 p-2 pb-3 shadow-[0_16px_48px_-12px_var(--shadow-lg)] will-change-transform select-none touch-none active:cursor-grabbing"
        :style="{
          width: PHOTO_W + 'px',
          transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}rad)`,
        }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      >
        <img
          :src="photoSrc"
          alt=""
          width="204"
          height="255"
          role="presentation"
          class="block w-[204px] h-auto object-cover aspect-[4/5] rounded-lg pointer-events-none"
          draggable="false"
        />
        <p class="mt-2 text-center text-[0.65rem] font-semibold uppercase tracking-widest text-ink-3 pointer-events-none">
          Boink
        </p>
      </div>
      <span class="sr-only">
        Floating portrait: drag anywhere on the page and release to throw; it bounces off screen edges.
      </span>
    </div>
  </Teleport>
</template>
