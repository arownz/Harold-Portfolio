<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps<{
  image: string;
  title: string;
  issuer: string;
}>();

const emit = defineEmits<{ close: [] }>();

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") emit("close");
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-8"
      @click.self="emit('close')"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/80 backdrop-blur-sm"
        @click="emit('close')"
      ></div>

      <!-- Modal -->
      <div class="relative z-10 max-w-3xl w-full animate-[fadeInUp_0.25s_ease]">
        <!-- Close button -->
        <button
          @click="emit('close')"
          class="absolute -top-4 -right-4 z-20 w-10 h-10 flex items-center justify-center
                 rounded-full bg-s1 border-2 border-edge text-ink hover:bg-brand hover:text-white
                 hover:border-brand transition-all duration-200 shadow-lg"
          aria-label="Close"
        >
          <X :size="20" />
        </button>

        <!-- Content -->
        <div class="bg-s1 rounded-2xl border-2 border-edge overflow-hidden shadow-[0_40px_80px_-12px_rgba(0,0,0,0.7)]">
          <!-- Image -->
          <div class="p-6 md:p-8 bg-linear-to-br from-s0 to-s2 flex items-center justify-center min-h-75 md:min-h-100">
            <img
              :src="props.image"
              :alt="props.title"
              class="max-w-full max-h-[60vh] h-auto object-contain rounded-lg shadow-md"
            />
          </div>

          <!-- Info -->
          <div class="px-6 py-5 md:px-8 border-t border-edge">
            <h3 class="text-xl font-bold text-ink mb-1">{{ props.title }}</h3>
            <p class="text-ink-3 text-sm">{{ props.issuer }}</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
