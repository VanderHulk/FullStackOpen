import { useState } from 'react'
import Todo from './components/Todo'

const App = (props) => {
  // console.log(props.todos); props is accepting data
  // console.log(props.todos)
  // for todoList
  const [todos, setTodos] = useState(props.todos)
  const [newTodo, setNewTodo] = useState('')
  const [newCategory, setNewCategory] = useState('general')
  const [showAll, setShowAll] = useState(true)


  // showAll is a state vale
  const todosToShow = showAll ? todos : todos.filter(todo => todo.done);

  // marking todo as done or undone
  const toggleDone = (id) => {
    const updatedTodos = todos.map(todo => {
      console.log({...todo})
      return todo.id === id ? { ...todo, done: !todo.done } : todo
  })
    setTodos(updatedTodos)
  }
  

  // add new todo
  const addTodo = (event) => {
    event.preventDefault();
    // this is the new object which will be saved in todos.json
    const todoObject = {
      id: String(todos.length + 1),
      text: newTodo,
      category: newCategory,
      done: false
    }
    // todos is a state value
    setTodos(todos.concat(todoObject))
    // clear input
    setNewTodo('')
    // reset category
    setNewCategory('general');
  }
  
  return (
    <div>
      <h1>Todos</h1>

      <button onClick={() => setShowAll(!showAll)}>
        {/* This is a button text that toggles "Show done" or "Show all" */}
        Show {showAll ? 'done' : 'all'}
      </button>

      <ul>
        {/* todos is a state value */}
        {/* Why are we using "todosToShow" instead of todos?
            - allows us to filter the list when Show button is clicked
            - todos (state value) is being used inside todosToShow function
        */}
        {todosToShow.map(todo => (
          <Todo            
            key={todo.id} 
            onClick={() => {
              console.log(todo.id)
              if (!todo.done) toggleDone(todo.id)
            }} 
            todo={todo} 
          />
        ))}
      </ul>

      <form onSubmit={addTodo}>
        <input
          placeholder='new todo'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input 
          placeholder='category' 
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default App