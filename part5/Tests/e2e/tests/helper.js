const { expect } = require('@playwright/test')

const login = async (page, username = 'root', password = 'secret') => {
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByRole('textbox', { name: 'Username' }).fill(username)
    /* or ('textbox').first()
       or page.getByLabel('Username')
    */
  await page.getByRole('textbox', { name: 'Password' }).fill(password)
     /* or ('textbox').last()
        or page.getByLabel('Password')
    */
  await page.getByRole('button', { name: 'Login' }).click()
}

const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'New note' }).click()
  await page.getByRole('textbox').fill(content)    
  await page.getByRole('button', { name: 'Save' }).click()
  // await page.getByText(content).waitFor() // course's
  // or
  await expect(page.getByText(content).last()).toBeVisible()
}

export { login, createNote }