<template>
  <div class="grain min-h-screen flex flex-col mesh-bg bg-[var(--bg)] transition-colors duration-300">
    <AppHeader :is-dark="isDark" @toggle-theme="toggleTheme" />

    <main class="relative z-[1] flex-1 max-w-5xl mx-auto w-full px-5 py-8">
      <StudentForm
        :editing-student="studentBeingEdited"
        @add-student="addStudent"
        @update-student="updateStudent"
        @cancel-edit="studentBeingEdited = null"
      />

      <StudentList
        :students="students"
        @edit-student="startEdit"
        @delete-student="deleteStudent"
      />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import StudentForm from './components/StudentForm.vue'
import StudentList from './components/StudentList.vue'
import AppFooter from './components/AppFooter.vue'

const students = ref([])
const studentBeingEdited = ref(null)
const STORAGE_KEY = 'module7-student-records'
const THEME_KEY = 'module7-theme'

const isDark = ref(false)

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
}

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
}

onMounted(() => {
  const savedTheme = localStorage.getItem(THEME_KEY)
  isDark.value = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme()

  const saved = localStorage.getItem(STORAGE_KEY)
  students.value = saved ? JSON.parse(saved) : []
})

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students.value))
}

function addStudent(newStudent) {
  students.value.push({ id: Date.now(), ...newStudent })
  saveStudents()
}

function updateStudent(updatedStudent) {
  const index = students.value.findIndex(s => s.id === updatedStudent.id)
  if (index !== -1) {
    students.value[index] = updatedStudent
    saveStudents()
  }
  studentBeingEdited.value = null
}

function deleteStudent(id) {
  const confirmed = window.confirm('Are you sure you want to delete this student record?')
  if (!confirmed) return
  students.value = students.value.filter(student => student.id !== id)
  saveStudents()
}

function startEdit(student) {
  studentBeingEdited.value = { ...student }
}
</script>