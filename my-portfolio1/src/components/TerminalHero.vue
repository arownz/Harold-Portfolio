<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);

const codeLines = [
  "Welcome to my portfolio...",
  "Loading experience...",
  "✓ Full Stack Development",
  "✓ UI/UX Design",
  "✓ Agile Method",
  "Building amazing projects...",
  "Ready to collaborate!",
  "Let's create something great.",
];

let frameId = 0;
let resizeHandler: (() => void) | null = null;
let resizeObserver: ResizeObserver | null = null;

function resizeCanvas(
  canvasElement: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
) {
  const dpr = window.devicePixelRatio || 1;
  const parent = canvasElement.parentElement;
  const width = parent?.clientWidth || window.innerWidth;
  const height = parent?.clientHeight || window.innerHeight;

  canvasElement.width = Math.floor(width * dpr);
  canvasElement.height = Math.floor(height * dpr);
  canvasElement.style.width = `${width}px`;
  canvasElement.style.height = `${height}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height,
  );
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

onMounted(() => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  // Resolve theme colors from CSS variables
  const css = getComputedStyle(document.documentElement);
  const primaryHex = (css.getPropertyValue("--primary") || "#9E1D4C").trim();
  const secondaryHex = (
    css.getPropertyValue("--secondary") || "#b84d7a"
  ).trim();
  const accentHex = (css.getPropertyValue("--accent") || "#e8a4bc").trim();
  const bgDarkerHex = (css.getPropertyValue("--bg-darker") || "#130a0f").trim();
  const bgDarkHex = (css.getPropertyValue("--bg-dark") || "#1c1018").trim();
  const textPrimaryHex = (css.getPropertyValue("--text-primary") || "#f1f5f9").trim();
  const textSecondaryHex = (css.getPropertyValue("--text-secondary") || "#cbd5e1").trim();
  const borderHex = (css.getPropertyValue("--border") || "#334155").trim();

  function hexToRgba(hex: string, a: number) {
    const h = hex.replace("#", "");
    const bigint = parseInt(
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h,
      16,
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  resizeCanvas(canvas.value, ctx);

  const render = (time: number) => {
    if (!canvas.value) return;

    const width = canvas.value.clientWidth;
    const height = canvas.value.clientHeight;

    ctx.clearRect(0, 0, width, height);

    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, hexToRgba(bgDarkerHex, 0.92));
    background.addColorStop(1, hexToRgba(bgDarkHex, 0.96));
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = hexToRgba(primaryHex, 0.06);
    ctx.lineWidth = 1;

    const scanlineOffset = (time / 20) % 20;
    for (let y = 0; y < height + 20; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y + scanlineOffset);
      ctx.lineTo(width, y + scanlineOffset);
      ctx.stroke();
    }

    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    ctx.restore();

    const shellWidth = Math.min(width * 0.9, 800);
    const shellHeight = Math.min(height * 0.7, 480);
    const shellX = (width - shellWidth) / 2;
    const shellY = height * 0.15;

    ctx.save();
    ctx.shadowColor = hexToRgba(primaryHex, 0.14);
    ctx.shadowBlur = 28;
    ctx.fillStyle = hexToRgba(bgDarkHex, 0.86);
    drawRoundedRect(ctx, shellX, shellY, shellWidth, shellHeight, 16);
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = hexToRgba(borderHex, 0.18);
    ctx.stroke();

    ctx.fillStyle = hexToRgba(bgDarkerHex, 0.98);
    drawRoundedRect(ctx, shellX, shellY, shellWidth, 36, 16);
    ctx.fill();

    ctx.fillStyle = hexToRgba(textPrimaryHex, 0.82);
    ctx.font =
      "600 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillText("My Portfolio", shellX + 16, shellY + 23);

    [primaryHex, secondaryHex, accentHex].forEach((colorHex, index) => {
      ctx.beginPath();
      ctx.fillStyle = colorHex;
      ctx.arc(
        shellX + shellWidth - 48 + index * 14,
        shellY + 18,
        4,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    });

    ctx.font =
      "500 15px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.textBaseline = "top";
    const leftPadding = shellX + 24;
    const topPadding = shellY + 52;
    const lineHeight = 26;
    const availableHeight = shellHeight - (topPadding - shellY) - 36;
    const visibleLines = Math.max(
      3,
      Math.min(8, Math.floor(availableHeight / lineHeight)),
    );
    const offset = Math.floor(time / 1500) % codeLines.length;

    for (let i = 0; i < visibleLines; i++) {
      const line = codeLines[(offset + i) % codeLines.length];
      const y = topPadding + i * lineHeight;
      const alpha = Math.min(0.55 + i * 0.03, 0.9);

      ctx.fillStyle = hexToRgba(textSecondaryHex, Math.min(alpha, 0.9));
      ctx.fillText(line, leftPadding, y);

      if (i === 0) {
        const cursorX = leftPadding + ctx.measureText(line).width + 6;
        const blink = Math.floor(time / 500) % 2 === 0;
        ctx.fillStyle = blink
          ? hexToRgba(primaryHex, 0.92)
          : hexToRgba(primaryHex, 0.18);
        ctx.fillRect(cursorX, y + 2, 10, 18);
      }
    }

    ctx.fillStyle = hexToRgba(primaryHex, 0.72);
    ctx.font =
      "400 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

    for (let i = 0; i < 60; i++) {
      const noiseX = shellX + Math.random() * shellWidth;
      const noiseY = shellY + 36 + Math.random() * (shellHeight - 46);
      ctx.fillStyle = hexToRgba(primaryHex, Math.random() * 0.05);
      ctx.fillRect(noiseX, noiseY, 1, 1);
    }

    ctx.restore();

    frameId = window.requestAnimationFrame(render);
  };

  resizeHandler = () => {
    if (!canvas.value) return;

    const currentCtx = canvas.value.getContext("2d");
    if (!currentCtx) return;

    resizeCanvas(canvas.value, currentCtx);
  };

  window.addEventListener("resize", resizeHandler);
  if ("ResizeObserver" in window && canvas.value.parentElement) {
    resizeObserver = new ResizeObserver(() => {
      if (!canvas.value) return;

      const currentCtx = canvas.value.getContext("2d");
      if (!currentCtx) return;

      resizeCanvas(canvas.value, currentCtx);
    });
    resizeObserver.observe(canvas.value.parentElement);
  }
  frameId = window.requestAnimationFrame(render);
});

onUnmounted(() => {
  if (frameId) {
    window.cancelAnimationFrame(frameId);
  }

  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <canvas ref="canvas" class="terminal-canvas"></canvas>
</template>

<style scoped>
.terminal-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.65;
}
</style>
