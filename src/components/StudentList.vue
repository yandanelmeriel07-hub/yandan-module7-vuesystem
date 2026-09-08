<template>
  <div class="animate-in rounded-3xl p-6 border shadow-glow
              bg-[var(--card)]/80 backdrop-blur-xl border-[var(--card-border)]">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
      <h2 class="font-brand font-semibold text-lg text-[var(--text)] flex items-center gap-2">
        Students
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full text-white
                     bg-gradient-to-r from-[var(--violet)] to-[var(--fuchsia)]">
          {{ students.length }}
        </span>
      </h2>

      <div class="relative">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
             fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input v-model="searchTerm" type="text" placeholder="Search last name…"
          class="rounded-xl pl-9 pr-3.5 py-2 border bg-[var(--bg)]/50 text-[var(--text)] text-sm w-full sm:w-56
                 border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]/40
                 focus:border-[var(--violet)] transition-all duration-200" />
      </div>
    </div>

    <div v-if="filteredStudents.length === 0" class="text-center py-14 animate-in">
      <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[var(--violet)]/15 to-[var(--fuchsia)]/15
                  flex items-center justify-center">
        <svg class="w-7 h-7 text-[var(--violet)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
          <circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <p class="text-[var(--text-muted)] text-sm">No students found.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-xs uppercase tracking-wide text-[var(--text-muted)] border-b border-[var(--card-border)]">
            <th class="text-left font-medium py-2.5">Student</th>
            <th class="text-left font-medium py-2.5">Course</th>
            <th class="text-left font-medium py-2.5">Year</th>
            <th class="text-left font-medium py-2.5">Email</th>
            <th class="text-right font-medium py-2.5">Actions</th>
          </tr>
        </thead>
        <TransitionGroup tag="tbody" name="list">
          <tr v-for="(student, i) in filteredStudents" :key="student.id"
            class="border-b border-[var(--card-border)]/60 hover:bg-[var(--violet)]/[0.05]
                   hover:shadow-glow rounded-xl transition-all duration-200 group">
            <td class="py-3">
              <div class="flex items-center gap-3">
                <span class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0
                             bg-gradient-to-br shadow-md group-hover:scale-105 transition-transform duration-200"
                      :style="{ backgroundImage: gradientFor(i) }">
                  {{ initials(student) }}
                </span>
                <div>
                  <p class="font-medium text-[var(--text)]">{{ student.firstName }} {{ student.lastName }}</p>
                  <p class="text-xs text-[var(--text-muted)]">{{ student.studentId }}</p>
                </div>
              </div>
            </td>
            <td class="py-3 text-[var(--text)]">{{ student.course }}</td>
            <td class="py-3">
              <span class="text-xs px-2.5 py-1 rounded-full font-medium
                           bg-gradient-to-r from-[var(--violet)]/15 to-[var(--fuchsia)]/15 text-[var(--violet)]">
                {{ student.yearLevel }}{{ ordinalSuffix(student.yearLevel) }} Yr
              </span>
            </td>
            <td class="py-3 text-[var(--text-muted)]">{{ student.email }}</td>
            <td class="py-3 text-right space-x-1">
              <button @click="$emit('edit-student', student)"
                class="text-xs font-medium px-2.5 py-1.5 rounded-lg text-[var(--violet)]
                       hover:bg-[var(--violet)]/10 transition-colors duration-150">
                Edit
              </button>
              <button @click="$emit('delete-student', student.id)"
                class="text-xs font-medium px-2.5 py-1.5 rounded-lg text-[var(--danger)]
                       hover:bg-[var(--danger)]/10 transition-colors duration-150">
                Delete
              </button>
            </td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  students: { type: Array, required: true }
})
defineEmits(['edit-student', 'delete-student'])

const searchTerm = ref('')

const filteredStudents = computed(() => {
  const keyword = searchTerm.value.toLowerCase().trim()
  if (!keyword) return props.students
  return props.students.filter(student => student.lastName.toLowerCase().includes(keyword))
})

function initials(student) {
  const a = student.firstName?.[0] || ''
  const b = student.lastName?.[0] || ''
  return (a + b).toUpperCase()
}

const avatarGradients = [
  'linear-gradient(135deg,#7c3aed,#c026d3)',
  'linear-gradient(135deg,#4c1d95,#7c3aed)',
  'linear-gradient(135deg,#c026d3,#db2777)',
  'linear-gradient(135deg,#6d28d9,#a855f7)',
]
function gradientFor(index) {
  return avatarGradients[index % avatarGradients.length]
}

function ordinalSuffix(n) {
  const map = { '1': 'st', '2': 'nd', '3': 'rd', '4': 'th' }
  return map[n] || 'th'
}
</script>