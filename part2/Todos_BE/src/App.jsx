import { useState } from 'react'

const App = (props) => {
  // console.log(props.todos); props is accepting data

  // for todoList
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [newCategory, setNewCategory] = useState('general')
  const [showAll, setShowAll] = useState(true)

  return (
      
  )
}

export default App