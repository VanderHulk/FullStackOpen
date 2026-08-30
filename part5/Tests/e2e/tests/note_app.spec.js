const { describe, beforeEach, test, expect } = require('@playwright/test')
const { login, createNote } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'secret'
      }  
    })

    await page.goto('/')
  })  

  test('front page can be opened', async ({ page }) => {  
    const locator = page.getByText('Notes App')  
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await login(page, 'root', 'wrong')
    
    const errorDiv = page.locator('.notification')
    await page.locator('.notification').innerText()
    await expect(errorDiv).toContainText('invalid username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('border-color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Superuser logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page)
    })

    test('user can log in', async ({ page }) => {    
      await expect(page.getByText('root logged in')).toBeVisible()
    })
  
    test('a new note can be created', async ({ page }) => {
      const content = 'A note created by playwright'

      await createNote(page, content)      

      await page.getByRole('link', { name: 'Notes' }).click()
      await expect(page.getByRole('link', { name: 'A note created by playwright' })).toBeVisible()
    })

    describe('and a note exists', () => {
      const content = 'Another note by playwright'

      beforeEach(async ({ page }) => {
        await createNote(page, content)        

        await page.getByRole('link', { name: 'Notes' }).click()
        await expect(page.getByRole('link', { name: 'Another note by playwright' })).toBeVisible()
      })

      test('importance can be changed', async ({ page }) => {
        // make not important
        await page.getByRole('link', { name: content }).click()
        await page.getByRole('button', { name: 'Make Unimportant' }).click()
        // make important
        await expect(page.getByRole('button', { name: 'Make Important' })).toBeVisible()
      })
    })
    
    describe('and several notes exist', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'First note')
        await createNote(page, 'Second note')
        await createNote(page, 'Third note')
      })

      test('one of those can be made unimportant', async ({ page }) => {

        await page.getByRole('link', { name: 'Notes' }).click()

        await page.getByRole('link', { name: 'Second note' }).click()    

        await page.getByRole('button', { name: 'Make Unimportant' }).click()

        await expect(page.getByRole('button', { name: 'Make Important' })).toBeVisible()
      })
    })
  })
})