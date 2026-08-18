const { describe, beforeEach, test, expect } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'secret'
      }  
    })

    await page.goto('http://localhost:5173')
  })

  const login = async (page, username = 'root', password = 'secret') => {
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('textbox', { name: 'Username' }).fill('root')
    /* or ('textbox').first()
       or page.getByLabel('Username')
    */
    await page.getByRole('textbox', { name: 'Password' }).fill('secret')
     /* or ('textbox').last()
        or page.getByLabel('Password')
    */
    await page.getByRole('button', { name: 'Login' }).click()
  }

  test('front page can be opened', async ({ page }) => {  
    const locator = page.getByText('Notes App')  
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })  

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page)
    })

    test('user can log in', async ({ page }) => {    
      await expect(page.getByText('root logged in')).toBeVisible()
    })
  
    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New Note' }).click()
      await page.getByRole('textbox').fill('A note created by playwright')
      await page.getByRole('button', { name: 'Save' }).click()
  
      await expect(page.getByText('A note created by playwright').last()).  toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'New Note' }).click()
        await page.getByRole('textbox').fill('Another note by playwright')
        await page.getByRole('button', { name: 'save' }).click()
      })

      test('importance can be changed', async ({ page }) => {
        // make not important '📄'
        await page.getByRole('button', { name: '📄' }).click()
        // make important '📌'
        await expect(page.getByText('📌')).toBeVisible()
      })
    })
  })
})