
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '../App.vue'

describe('App', () => {

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')

    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }))

    vi.stubGlobal('confirm', vi.fn(() => true))
  })


  it('loads students from localStorage and defaults missing status to Active', async () => {
    const students = [
      {
        id: 1,
        studentId: '2023-00123',
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        course: 'BS Computer Science',
        yearLevel: '3',
        email: 'juan@example.com'
      }
    ]

    localStorage.setItem(
      'module7-student-records',
      JSON.stringify(students)
    )

    const wrapper = mount(App)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.students).toEqual([
      {
        ...students[0],
        status: 'Active'
      }
    ])
  })


  it('adds a new student and saves it to localStorage with Active status', async () => {
    const wrapper = mount(App)

    const newStudent = {
      studentId: '2023-00124',
      firstName: 'Maria',
      lastName: 'Santos',
      course: 'BS Information Technology',
      yearLevel: '2',
      email: 'maria@example.com'
    }

    await wrapper.findComponent({ name: 'StudentForm' })
      .vm.$emit('add-student', newStudent)

    expect(wrapper.vm.students).toHaveLength(1)

    expect(wrapper.vm.students[0]).toMatchObject({
      ...newStudent,
      status: 'Active'
    })

    const saved = JSON.parse(
      localStorage.getItem('module7-student-records')
    )

    expect(saved).toHaveLength(1)

    expect(saved[0]).toMatchObject({
      ...newStudent,
      status: 'Active'
    })
  })


  it('updates an existing student', async () => {
    const existingStudent = {
      id: 1,
      studentId: '2023-00123',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      course: 'BS Computer Science',
      yearLevel: '3',
      email: 'juan@example.com'
    }

    localStorage.setItem(
      'module7-student-records',
      JSON.stringify([existingStudent])
    )

    const wrapper = mount(App)

    await wrapper.vm.$nextTick()

    const updatedStudent = {
      ...existingStudent,
      firstName: 'Juan Updated',
      course: 'BS Information Technology',
      status: 'Active'
    }

    await wrapper.findComponent({ name: 'StudentForm' })
      .vm.$emit('update-student', updatedStudent)

    expect(wrapper.vm.students[0]).toMatchObject(updatedStudent)

    const saved = JSON.parse(
      localStorage.getItem('module7-student-records')
    )

    expect(saved[0]).toMatchObject(updatedStudent)
  })


  it('starts editing a selected student and defaults missing status to Active', async () => {
    const student = {
      id: 1,
      studentId: '2023-00123',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      course: 'BS Computer Science',
      yearLevel: '3',
      email: 'juan@example.com'
    }

    const wrapper = mount(App)

    await wrapper.findComponent({ name: 'StudentList' })
      .vm.$emit('edit-student', student)

    expect(wrapper.vm.studentBeingEdited).toEqual({
      ...student,
      status: 'Active'
    })
  })


  it('deletes a student after confirmation', async () => {
    const students = [
      {
        id: 1,
        studentId: '2023-00123',
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        course: 'BS Computer Science',
        yearLevel: '3',
        email: 'juan@example.com'
      },
      {
        id: 2,
        studentId: '2023-00124',
        firstName: 'Maria',
        lastName: 'Santos',
        course: 'BS Information Technology',
        yearLevel: '2',
        email: 'maria@example.com'
      }
    ]

    localStorage.setItem(
      'module7-student-records',
      JSON.stringify(students)
    )

    const wrapper = mount(App)

    await wrapper.vm.$nextTick()

    window.confirm = vi.fn(() => true)

    await wrapper.findComponent({ name: 'StudentList' })
      .vm.$emit('delete-student', 1)

    expect(window.confirm).toHaveBeenCalled()

    expect(wrapper.vm.students).toHaveLength(1)
    expect(wrapper.vm.students[0].id).toBe(2)
  })


  it('does not delete a student when confirmation is cancelled', async () => {
    const student = {
      id: 1,
      studentId: '2023-00123',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      course: 'BS Computer Science',
      yearLevel: '3',
      email: 'juan@example.com'
    }

    localStorage.setItem(
      'module7-student-records',
      JSON.stringify([student])
    )

    const wrapper = mount(App)

    await wrapper.vm.$nextTick()

    window.confirm = vi.fn(() => false)

    await wrapper.findComponent({ name: 'StudentList' })
      .vm.$emit('delete-student', 1)

    expect(wrapper.vm.students).toHaveLength(1)

    expect(wrapper.vm.students[0]).toEqual({
      ...student,
      status: 'Active'
    })
  })


  it('toggles dark mode and saves the theme preference', async () => {
    const wrapper = mount(App)

    expect(wrapper.vm.isDark).toBe(false)

    await wrapper.findComponent({ name: 'AppHeader' })
      .vm.$emit('toggle-theme')

    expect(wrapper.vm.isDark).toBe(true)

    expect(localStorage.getItem('module7-theme'))
      .toBe('dark')

    expect(document.documentElement.classList.contains('dark'))
      .toBe(true)
  })

})

