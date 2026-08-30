# Notes App Practice

> ⚠️ This project is for learning purposes only.

This code is **not my original work**. I am using it to practice **React hooks** and to familiarize myself with **Git and GitHub workflows** (adding, committing, and pushing changes).  

The app follows the **FullStackOpen course** examples, and I am rewriting the code myself as an exercise to understand how it works.

## Learning Goals

- Practice using React `useState` and handling events
- Understand component props and mapping lists
- Get hands-on experience with Git/GitHub workflow

## Revisions

> 27.3.2026
- Each note in the list has its own radio button for selection
- New state, selecting a note updates selectedId
- Note text color is red for IMPORTANT and gray for NOT
- Removed individual buttons for changing note importance, 
- Add a single button to update importance - `Mark Important/NOT Important`
- Added `Delete Note` button

> 22.6.2026

Refactored and extended Notes App with full authentication and authorization flow.

- Implemented JWT-based login system
- Added token persistence using `localStorage` so user stays logged in on refresh
- Configured axios service layer to automatically attach Bearer token to requests
- Introduced backend middleware for token extraction and user authentication
- Fixed middleware order issue causing `request.token` to be undefined

### User experience updates
- Logged-in user is displayed with a logout button
- Logout clears local storage and resets authentication state
- Notes are only editable (delete/importance toggle) when user is logged in

### Authorization rules
- Any authenticated user can toggle note importance
- Only the user who created a note can delete it

### Refactoring
- Converted note service to fully use `async/await`
- Centralized API logic into service modules (`notes`, `login`)
- Improved state updates using functional updates (`setNotes(prev => ...)`)
- Cleaned up conditional rendering for login vs authenticated UI

---

> 6.7.2026

### Testing React Apps

- `npm install --save-dev vitest jsdom`
- `npm install --save-dev @testing-library/react @testing-library/jest-dom`
- add a script to package.json `"test": "vitest run"`

### Things to remember:

`Lifting state up` moving state from a child component to a shared parent component *one parent component own the state and pass it down via props*

Why do this?
- two components need the same data
- you want components to sync *if a state lives in one place, there's no mismatch* 

### React Hooks
`useRef` creates the reference in the parent
`useImperativeHandle` defines what the parent is allowed to do or access through the ref

`forwardRef` (bridge between useRef and useImperativeHandle) passes it into the child; allows a component to receive a ref from its parent 

**Important:** A parent can call functions inside a child component using a ref — but the child decides what functions are exposed.

### React Ref + useImperativeHandle (Togglable Pattern)
What problem does this solve?
- Sometimes a parent component needs to control a child component’s internal behavior.

  Example: Close a form after successfully submitting data.

  But the problem is:
  - The form visibility state is inside the child (Togglable)
  - The parent (App) does not have direct access to it

### Rendering the component for tests (Part 5.c)
- A test is another environment where we can render a React component and check its behavior.
- Instead of showing the UI to a user in a real browser, React Testing Library creates a fake browser environment using JSDOM.
  - The component is rendered into this fake DOM.
  - We can inspect and interact with it without opening Chrome. `render(<Note ... />)`
- What does this code do?
  ``` javascript 
  afterEach(() => { cleanup() }) 
  ```
  > It resets the fake browser after every test. Each test starts with a clean DOM.
- How does vitest know to run `cleanup()` after each test?
  - It knows about it because the setup file is loaded through vite.config.js.
  > configure vite.config.js with this:
    ```
    test: {
      environment: 'jsdom'  ,
      globals: true,
      setupFiles: './testSetup.js'
    }
    ```
- `screen.debug()` 
  - Displays the current rendered DOM in the terminal
  - Useful when a test fails because you can see what exists.
  - Let's you see the action behind the scenes of tests

- The testing tools connection

  `Vitest` Runs tests and provides test lifecycle functions

  `React Testing Library (@testing-library/react)`  Provides render() and screen()
  
  `JSDOM` Creates the fake browser DOM
  
  `React` Creates the component output
- ### VERY IMPORTANT: Tests should adapt to the application behavior, not the other way around.

- `npm test -- --test-concurrency=1` Running tests sequentially (in order) to prevent test files from competing with each other for shared resources/state. This prevents multiple test files from running at the same time.

----- OR -----

  add `fileParallelism: false` to vite.config.js


### Important! Finding the elements during tests
1. If a form has multiple input fields for example, use
   - const inputs = screen.`getAllByRole('textbox')`
     await user.type(`inputs[0]`, 'testing a form...')
     
     `getAllByRole` returns an array

2. If the input field has a label, the field could be located using `getByLabelText`
   - const input = screen.`getByLabelText`('content')

3. If the input field has a placeholder, `getByPlaceholderText`
   - const input = screen.`getByPlaceholderText`('write note content here')

4. By querySelector of the container object, which is returned by render. Any CSS selector can be used with this method for searching elements in tests.
   - Example: a unique id
     const { container } = render(<NoteForm createNote={createNote} />)
     const input = container.querySelector('#note-input'), where `#note-input` is the <input> tag's id

> 21.8.2026

### React Router
- Excellent way to manage navigation in a website

- `npm install react-router-dom` install React Router

- Forgot to update the log that I have remove the radio buttons from every note to accomodate the course's Note exercises. A note has '📌' (make important) and '📄' (make not important) and a '🗑️' (delete) if the logged in user created the note.

> 24-29.8.2026

- I have totally forgotten to log my progress this week so this is a compact log for this week.

- Started experimenting with React Router independently before following the course example.

- Reviewed the difference between Express Router (backend request routing) and React Router (frontend URL/navigation routing).

- Added BrowserRouter, Routes, Route, and Link to the Note App.

- Refactored the Note App by creating a views/ directory for route-specific views Create, Home, and Notes

- Kept reusable UI components in components/ and API communication in services/.

- Kept global UI such as login/logout, notifications, and footer outside the individual routes.

- Moved the notes list <ul> from the Note component into the Notes view.

- Moved showAll and handleNoteShow into the Notes view because they are specific to displaying the notes list.

- Changed individual notes into links using `/notes/:id`.

- Learned that :id is a dynamic route parameter and can be retrieved with useParams().

- Refactored the individual note route so the selected note can be identified from its URL.

- Learned and reviewed the browser History API and its relationship to client-side routing.

- Fixed note link styling using color: inherit so links retain the note's existing color.

- Encountered and fixed a Windows/VS Code filename casing issue (home.jsx → Home.jsx) by restarting the development environment.

- Started updating frontend tests to match the new React Router structure and note interaction flow.

- E2E tests will also need to be updated because the note interaction now uses the /notes/:id route.

> 30.8.2026

- Fixing tests one by one. Now working on Note.test.jsx...

- Found out that some tests are not working because of useParams()

- The FSO course does not require to fix the tests, but I want everything to work before moving on.

- ChatGPT is guiding me how to introduce useParams() into the tests using MemoryRouter

- Fixed Note.test.jsx using MemoryRouter to simulate Routes and useParams 

- Created a helper function for rendering Note

- Confirmed that all frontend tests are successful!

- Fixed E2E tests. I have actually forgotten how to run the playwright test and I remembered that there was some kind of UI where I can see the actual test being run. Then, I checked my notes and there it was `npm run test -- --ui`. And one more thing, I have also forgotten that you need to run the backend (test mode) and the frontend too before running the E2E tests. Everything works now! Phew!