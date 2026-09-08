
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import StudentForm from '../components/StudentForm.vue'

const validStudent = {
  studentId: '2023-00123',
  firstName: 'Juan',
  lastName: 'Dela Cruz',
  course: 'BS Computer Science',
  yearLevel: '3',
  email: 'juan@example.com'
}

describe('StudentForm', () => {

  it('adds a student when all required fields are filled', async () => {
    const wrapper = mount(StudentForm)

    await wrapper.find('input[placeholder="2023-00123"]')
      .setValue(validStudent.studentId)

    await wrapper.findAll('input')[1]
      .setValue(validStudent.email)

    await wrapper.findAll('input')[2]
      .setValue(validStudent.firstName)

    await wrapper.findAll('input')[3]
      .setValue(validStudent.lastName)

    await wrapper.find('input[placeholder="BS Computer Science"]')
      .setValue(validStudent.course)

    await wrapper.find('select')
      .setValue(validStudent.yearLevel)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('add-student')).toBeTruthy()

    expect(wrapper.emitted('add-student')[0][0])
      .toMatchObject(validStudent)
  })


  it('does not add a student when Student ID is empty', async () => {
    const wrapper = mount(StudentForm)

    await wrapper.findAll('input')[1]
      .setValue(validStudent.email)

    await wrapper.findAll('input')[2]
      .setValue(validStudent.firstName)

    await wrapper.findAll('input')[3]
      .setValue(validStudent.lastName)

    await wrapper.find('input[placeholder="BS Computer Science"]')
      .setValue(validStudent.course)

    await wrapper.find('select')
      .setValue(validStudent.yearLevel)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('add-student')).toBeFalsy()

    expect(wrapper.text())
      .toContain('Please fill in Student ID')
  })


  it('does not add a student when First Name is empty', async () => {
    const wrapper = mount(StudentForm)

    await wrapper.find('input[placeholder="2023-00123"]')
      .setValue(validStudent.studentId)

    await wrapper.findAll('input')[1]
      .setValue(validStudent.email)

    await wrapper.findAll('input')[3]
      .setValue(validStudent.lastName)

    await wrapper.find('input[placeholder="BS Computer Science"]')
      .setValue(validStudent.course)

    await wrapper.find('select')
      .setValue(validStudent.yearLevel)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('add-student')).toBeFalsy()
  })


  it('does not add a student when Last Name is empty', async () => {
    const wrapper = mount(StudentForm)

    await wrapper.find('input[placeholder="2023-00123"]')
      .setValue(validStudent.studentId)

    await wrapper.findAll('input')[1]
      .setValue(validStudent.email)

    await wrapper.findAll('input')[2]
      .setValue(validStudent.firstName)

    await wrapper.find('input[placeholder="BS Computer Science"]')
      .setValue(validStudent.course)

    await wrapper.find('input[placeholder="BS Computer Science"]')
      .setValue(validStudent.course)

    await wrapper.find('select')
      .setValue(validStudent.yearLevel)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('add-student')).toBeFalsy()
  })


  it('does not add a student when Course is empty', async () => {
    const wrapper = mount(StudentForm)

    await wrapper.find('input[placeholder="2023-00123"]')
      .setValue(validStudent.studentId)

    await wrapper.findAll('input')[1]
      .setValue(validStudent.email)

    await wrapper.findAll('input')[2]
      .setValue(validStudent.firstName)

    await wrapper.findAll('input')[3]
      .setValue(validStudent.lastName)

    await wrapper.find('select')
      .setValue(validStudent.yearLevel)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('add-student')).toBeFalsy()
  })


  it('updates a student when editing an existing record', async () => {
    const student = {
      id: 1,
      ...validStudent
    }

    const wrapper = mount(StudentForm)

    // Change the prop after mounting so the watch() is triggered
    await wrapper.setProps({
      editingStudent: student
    })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('update-student')).toBeTruthy()

    expect(wrapper.emitted('update-student')[0][0])
      .toMatchObject(student)
  })


  it('cancels editing when Cancel button is clicked', async () => {
    const student = {
      id: 1,
      ...validStudent
    }

    const wrapper = mount(StudentForm)

    await wrapper.setProps({
      editingStudent: student
    })

    const cancelButton = wrapper.find('button[type="button"]')

    expect(cancelButton.exists()).toBe(true)

    await cancelButton.trigger('click')

    expect(wrapper.emitted('cancel-edit')).toBeTruthy()
  })

})
