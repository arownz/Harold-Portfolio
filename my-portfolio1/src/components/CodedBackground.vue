<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let raf = 0;
let onResize: (() => void) | null = null;

function resizeCanvas(canvasEl: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1;
  const parent = canvasEl.parentElement;
  const w = parent?.clientWidth || window.innerWidth;
  const h = parent?.clientHeight || window.innerHeight;
  canvasEl.width = Math.floor(w * dpr);
  canvasEl.height = Math.floor(h * dpr);
  canvasEl.style.width = `${w}px`;
  canvasEl.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function hexToRgba(hex: string, a: number) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

onMounted(() => {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  const css = getComputedStyle(document.documentElement);
  const primary = (css.getPropertyValue('--primary') || '#9E1D4C').trim();
  const secondary = (css.getPropertyValue('--secondary') || '#b84d7a').trim();

  resizeCanvas(canvas.value, ctx);

  const nodeCount = Math.min(20, Math.max(12, Math.floor((canvas.value.clientWidth * canvas.value.clientHeight) / 30000)));
  const nodes = Array.from({ length: nodeCount }).map(() => ({
    x: Math.random(),
    y: Math.random(),
    r: 1.5 + Math.random() * 3.5,
    phase: Math.random() * Math.PI * 2,
  }));

  const render = (t: number) => {
    if (!canvas.value) return;
    const w = canvas.value.clientWidth;
    const h = canvas.value.clientHeight;
    ctx.clearRect(0, 0, w, h);

    // gradient wash
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, hexToRgba(primary, 0.07));
    g.addColorStop(1, hexToRgba(secondary, 0.05));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // grid lines
    ctx.save();
    ctx.strokeStyle = hexToRgba(primary, 0.08);
    ctx.lineWidth = 1;
    const gridSpacing = Math.max(50, w / 14);
    for (let x = 0; x < w; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x + (Math.sin(t / 400 + x) * 3), 0);
      ctx.lineTo(x + (Math.sin(t / 400 + x) * 3), h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y + (Math.cos(t / 400 + y) * 3));
      ctx.lineTo(w, y + (Math.cos(t / 400 + y) * 3));
      ctx.stroke();
    }
    ctx.restore();

    // nodes and connecting lines
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    nodes.forEach((node, i) => {
      const x = node.x * w + Math.sin((t / 800) + node.phase) * 10;
      const y = node.y * h + Math.cos((t / 700) + node.phase) * 10;

      // larger glow
      ctx.beginPath();
      const grd = ctx.createRadialGradient(x, y, 0, x, y, node.r * 16);
      grd.addColorStop(0, hexToRgba(primary, 0.2));
      grd.addColorStop(1, hexToRgba(primary, 0));
      ctx.fillStyle = grd;
      ctx.fillRect(x - node.r * 16, y - node.r * 16, node.r * 32, node.r * 32);

      // node
      ctx.beginPath();
      ctx.fillStyle = hexToRgba(secondary, 0.95);
      ctx.arc(x, y, node.r + Math.sin(t / 300 + node.phase) * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // inner bright core
      ctx.beginPath();
      ctx.fillStyle = hexToRgba('#ffffff', 0.5);
      ctx.arc(x, y, (node.r + Math.sin(t / 300 + node.phase) * 0.8) * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // connects
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        const bx = nodeB.x * w + Math.sin((t / 800) + nodeB.phase) * 10;
        const by = nodeB.y * h + Math.cos((t / 700) + nodeB.phase) * 10;
        const dx = x - bx;
        const dy = y - by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(w, h) / 2.5;
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.strokeStyle = hexToRgba(secondary, Math.max(0.04, 0.18 - dist / maxDist * 0.18));
          ctx.lineWidth = 1;
          ctx.moveTo(x, y);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
    });
    ctx.restore();

    raf = requestAnimationFrame(render);
  };

  onResize = () => resizeCanvas(canvas.value!, ctx);
  window.addEventListener('resize', onResize);
  raf = requestAnimationFrame(render);
});

onUnmounted(() => {
  cancelAnimationFrame(raf);
  if (onResize) {
    window.removeEventListener('resize', onResize);
  }
});
</script>

<template>
  <canvas ref="canvas" class="coded-canvas"></canvas>
</template>

<style scoped>
.coded-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}
</style>
