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

---