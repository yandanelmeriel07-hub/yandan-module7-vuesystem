<template>
  <button
    @click="$emit('toggle')"
    class="relative w-16 h-9 rounded-full flex items-center px-1 shadow-glow
           bg-gradient-to-r from-[var(--violet)] to-[var(--fuchsia)]
           hover:brightness-110 active:scale-95 transition-all duration-200"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <span class="absolute inset-0.5 rounded-full bg-[var(--card)]/90"></span>

    <span
      class="relative w-7 h-7 rounded-full flex items-center justify-center transform transition-transform duration-300 ease-out z-10
             bg-gradient-to-br from-[var(--violet)] to-[var(--fuchsia)] shadow-md"
      :class="isDark ? 'translate-x-7' : 'translate-x-0'"
    >
      <span class="absolute -inset-1.5 rounded-full border border-dashed border-[var(--violet-soft)]/50 animate-orbit"></span>
      <svg v-if="!isDark" class="w-3.5 h-3.5 text-white animate-pop" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
        <circle cx="12" cy="12" r="4" />
        <path stroke-linecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg v-else class="w-3.5 h-3.5 text-white animate-pop" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </span>
  </button>
</template>

<script setup>
defineProps({ isDark: { type: Boolean, required: true } })
defineEmits(['toggle'])
</script>