const Todo = ({ todo, onClick }) => {
    if(!todo) return null

    return (
        <li 
            onClick={onClick} 
            style={{
                cursor: onClick ? 'pointer' : 'default',
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? 'gray' : 'black',
            }}
        >
            {todo.text} [{todo.category}] {todo.done ? "(done)" : ""}
        </li>
    )
}

export default Todo