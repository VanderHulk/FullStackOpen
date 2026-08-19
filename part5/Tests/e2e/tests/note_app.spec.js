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
      await createNote(page, 'A note created by playwright')
  
      await expect(page.getByText('A note created by playwright').last()).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'Another note by playwright')
      })

      test('importance can be changed', async ({ page }) => {
        // make not important '📄'
        await page.getByRole('button', { name: '📄' }).click()
        // make important '📌'
        await expect(page.getByText('📌')).toBeVisible()
      })
    })
    
    describe('and several notes exist', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'First note')
        await createNote(page, 'Second note')
        await createNote(page, 'Third note')
      })

      test('one of those can be made unimportant', async ({ page }) => {
        // await page.pause()
        /* const otherNoteText = page.getByText('Second note')
        const otherNoteElement = otherNoteText.locator('..')

        await otherNoteElement
          .getByRole('button', { name: '📄' }).click()
      
        await expect(otherNoteElement.getByRole('button', { name: '📌' })).toBeVisible() */
        
        /* We scope the selector to the specific <li> that contains "Second note",
        so we target the correct button without relying on a fragile index like .nth().
        This avoids ambiguity when several notes share the same button label. */

        const secondNote = page.locator('li').filter({ hasText: 'Second note' })        

        await secondNote.getByRole('button', { name: '📄' }).click()

        await expect(secondNote.getByRole('button', { name: '📌' })).toBeVisible()
      })
    })
  })
})