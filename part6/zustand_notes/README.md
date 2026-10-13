# Zustand Notes App

Note: This is a practice project based on exercises from the Full Stack Open course. It is not an original project of my own.

> 25.9.2026

1. **Immutable state updates:** According to Zustand's documentation, state needs to be updated immutably.

2. **Updating state with `set`:** The callback receives the current state.

   ```javascript
   add: note => set(
     state => ({ notes: state.notes.concat(note) })
   )
   ```

3. **`push()` vs `concat()`:** `push()` mutates the existing array; `concat()` returns a new array.

4. **Pure functions:** Same inputs produce the same output, without modifying external state or causing side effects.

5. **Zustand store:** The store can contain both state (`notes`) and actions (`add`).

6. **Form handling:** Used `e.preventDefault()`, `e.target.note.value`, and `e.target.reset()` to handle form submission.

7. **React props:** Destructured the `onSubmit` prop in `NoteForm`.

> 26.9.2026

8. **Tailwind CSS v4:** Installed Tailwind CSS and the Vite plugin, configured `vite.config.js`, and imported Tailwind in the CSS entry file.

9. **Styling:** Started using Tailwind utility classes directly in JSX.

10. Component structure: Split the app into Note, NoteForm, NoteList, and VisibilityFilter.

11. Toggling importance: Use the toggleImportance store action to change a note's importance by ID.

12. Visibility filters: Add radio buttons for all, important, and unimportant, using setFilter to update the selected filter.

> 12.10.2026

13. Installed and created json-server for note list.

14. Setup fetch to fetch data from the json-server

> 13.10.2026

15. Added useEffect to initialize existing notes from server into the app.

16. Added `createNew` POST request for creating new note 
