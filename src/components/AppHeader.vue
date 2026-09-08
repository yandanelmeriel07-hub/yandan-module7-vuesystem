<template>
  <header class="sticky top-0 z-20 backdrop-blur-xl bg-[var(--bg)]/70 border-b border-[var(--card-border)]">
    <div class="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3 animate-in">
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--violet)] to-[var(--fuchsia)]
                    flex items-center justify-center shadow-glow shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3L1.5 8.25 12 13.5l10.5-5.25L12 3z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 10.5v5.25c0 1 3 3 6.75 3s6.75-2 6.75-3V10.5" />
          </svg>
        </div>
        <div>
          <h1 class="font-brand font-bold text-lg leading-tight
                     bg-gradient-to-r from-[var(--violet)] to-[var(--fuchsia)] bg-clip-text text-transparent">
            Student Records
          </h1>
          <p class="text-xs text-[var(--text-muted)]">Student Information System · Prototype</p>
        </div>
      </div>

      <ThemeToggle :is-dark="isDark" @toggle="$emit('toggle-theme')" />
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'
defineProps({ isDark: { type: Boolean, required: true } })
defineEmits(['toggle-theme'])
</script>