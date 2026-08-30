#Note App: Frontend and Backend E2E Testing

> 17.8.2026

- Install playwright `npm init playwright@latest`

- Commands for running tests: 
  - `npm test` : running test
  - `npm run test:report` : display detailed report
  - `npm run test -- --ui` : running test via graphical UI
  - `npm test -- -g "login fails with wrong password"` : run a single test

- REMEMBER THIS! Playwright tests assume that "the system under test is running when the tests are executed." Playwright tests DO NOT START THE SYSTEM under test during testing.

- DO NOT FORGET TO ADD playwright scripts
  ``` javascript
    "test": "playwright test",
    "test:report": "playwright show-report"
  ```

- ``` javascript
    await page.screenshot({ path: 'screenshot.png' })
  ```

- Remember to run the `npm run start:test` script for testing.
  or
  Add a script in `playwright.config.js` to automatically run the test script from the backend
  ```javascript
    webServer: {
      command: 'cd ../../Notes_BE && npm run start:test',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
    },
  ```
- test('a new note can be created'... failed at first because beforeEach... refreshes the page before every test resulting to user logging out.
  Solution was to add a login helper function so we can log in whenever a test needs the user to login first without repeating the code. 

- `npm test -- -g'one of those can be made nonimportant' --debug` command to run test on debug mode

- `npm run test -- --trace on` command to view a visual tract of the tests

## References:

- Playwright's documentation: https://playwright.dev/docs/intro

- Launch a browser instance: https://playwright.dev/docs/api/class-playwright