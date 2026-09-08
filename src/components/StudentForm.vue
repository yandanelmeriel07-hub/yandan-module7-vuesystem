<template>
  <div class="animate-in rounded-3xl p-6 mb-6 border shadow-glow
              bg-[var(--card)]/80 backdrop-blur-xl border-[var(--card-border)]">
    <div class="flex items-center gap-2 mb-5">
      <span class="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--fuchsia)] animate-pulse"></span>
      <h2 class="font-brand font-semibold text-lg text-[var(--text)]">
        {{ editingId ? 'Edit Student' : 'Add New Student' }}
      </h2>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium mb-1.5 text-[var(--text-muted)]">Student ID</label>
        <input v-model="form.studentId" type="text" placeholder="2023-00123"
          class="w-full rounded-xl px-3.5 py-2.5 border bg-[var(--bg)]/50 text-[var(--text)] text-sm
                 border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]/40
                 focus:border-[var(--violet)] transition-all duration-200" />
      </div>

      <div>
        <label class="block text-xs font-medium mb-1.5 text-[var(--text-muted)]">Email</label>
        <input v-model="form.email" type="email"
          class="w-full rounded-xl px-3.5 py-2.5 border bg-[var(--bg)]/50 text-[var(--text)] text-sm
                 border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]/40
                 focus:border-[var(--violet)] transition-all duration-200" />
      </div>

      <div>
        <label class="block text-xs font-medium mb-1.5 text-[var(--text-muted)]">First Name</label>
        <input v-model="form.firstName" type="text"
          class="w-full rounded-xl px-3.5 py-2.5 border bg-[var(--bg)]/50 text-[var(--text)] text-sm
                 border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]/40
                 focus:border-[var(--violet)] transition-all duration-200" />
      </div>

      <div>
        <label class="block text-xs font-medium mb-1.5 text-[var(--text-muted)]">Last Name</label>
        <input v-model="form.lastName" type="text"
          class="w-full rounded-xl px-3.5 py-2.5 border bg-[var(--bg)]/50 text-[var(--text)] text-sm
                 border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]/40
                 focus:border-[var(--violet)] transition-all duration-200" />
      </div>

      <div>
        <label class="block text-xs font-medium mb-1.5 text-[var(--text-muted)]">Course</label>
        <input v-model="form.course" type="text" placeholder="BS Computer Science"
          class="w-full rounded-xl px-3.5 py-2.5 border bg-[var(--bg)]/50 text-[var(--text)] text-sm
                 border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]/40
                 focus:border-[var(--violet)] transition-all duration-200" />
      </div>

      <div>
        <label class="block text-xs font-medium mb-1.5 text-[var(--text-muted)]">Year Level</label>
        <select v-model="form.yearLevel"
          class="w-full rounded-xl px-3.5 py-2.5 border bg-[var(--bg)]/50 text-[var(--text)] text-sm
                 border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]/40
                 focus:border-[var(--violet)] transition-all duration-200">
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>

      <Transition name="fade" mode="out-in">
        <p v-if="errorMessage" key="err"
          class="sm:col-span-2 animate-pop flex items-center gap-2 text-sm rounded-xl px-4 py-2.5
                 bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]/20">
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9" /><path stroke-linecap="round" d="M12 8v5M12 16h.01" />
          </svg>
          {{ errorMessage }}
        </p>
        <p v-else-if="successMessage" key="ok"
          class="sm:col-span-2 animate-pop flex items-center gap-2 text-sm rounded-xl px-4 py-2.5
                 bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20">
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {{ successMessage }}
        </p>
      </Transition>

      <div class="sm:col-span-2 flex gap-3 pt-1">
        <button type="submit"
          class="btn-shine px-5 py-2.5 rounded-xl font-medium text-sm text-white shadow-glow
                 bg-gradient-to-r from-[var(--violet)] to-[var(--fuchsia)]
                 hover:shadow-glow-lg active:scale-[0.97] transition-all duration-200">
          {{ editingId ? 'Update Student' : 'Add Student' }}
        </button>
        <button v-if="editingId" type="button" @click="cancelEdit"
          class="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.97]
                 bg-[var(--card-border)]/50 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-border)]">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingStudent: { type: Object, default: null }
})
const emit = defineEmits(['add-student', 'update-student', 'cancel-edit'])

const emptyForm = { studentId: '', firstName: '', lastName: '', course: '', yearLevel: '1', email: '' }
const form = ref({ ...emptyForm })
const editingId = ref(null)
const errorMessage = ref('')
const successMessage = ref('')

watch(() => props.editingStudent, (student) => {
  if (student) {
    form.value = { ...student }
    editingId.value = student.id
  }
})

function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.value.studentId.trim() || !form.value.firstName.trim() ||
      !form.value.lastName.trim() || !form.value.course.trim()) {
    errorMessage.value = 'Please fill in Student ID, First Name, Last Name, and Course.'
    return
  }

  if (editingId.value) {
    emit('update-student', { ...form.value, id: editingId.value })
    successMessage.value = 'Student updated successfully.'
  } else {
    emit('add-student', { ...form.value })
    successMessage.value = 'Student added successfully.'
  }

  form.value = { ...emptyForm }
  editingId.value = null
  setTimeout(() => { successMessage.value = '' }, 2400)
}

function cancelEdit() {
  form.value = { ...emptyForm }
  editingId.value = null
  emit('cancel-edit')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>