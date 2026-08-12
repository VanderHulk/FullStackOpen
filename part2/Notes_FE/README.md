# Notes App Practice

> ⚠️ This project is for learning purposes only.

This code is **not my original work**. I am using it to practice **React hooks** and to familiarize myself with **Git and GitHub workflows** (adding, committing, and pushing changes).  

The app follows the **FullStackOpen course** examples, and I am rewriting the code myself as an exercise to understand how it works.

## Learning Goals

- Practice using React `useState` and handling events
- Understand component props and mapping lists
- Get hands-on experience with Git/GitHub workflow

## Revisions

`27.3.2026`
- Each note in the list has its own radio button for selection
- New state, selecting a note updates selectedId
- Note text color is red for IMPORTANT and gray for NOT
- Removed individual buttons for changing note importance, 
- Add a single button to update importance - `Mark Important/NOT Important`
- Added `Delete Note` button

---

`22.6.2026`

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

`6.7.2026`

### Testing React Apps

- `npm install --save-dev vitest jsdom`
- `npm install --save-dev @testing-library/react @testing-library/jest-dom`
- add a script to package.json `"test": "vitest run"`
- 

---

## Things to remember:

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
- ## VERY IMPORTANT: Tests should adapt to the application behavior, not the other way around.

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


