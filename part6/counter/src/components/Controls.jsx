import { useCounterControls }  from '../store/counterStore'

const Controls = () => {
  // BEST PRACTICE
  /* 
  const increment = useCounterStore(state => state.increment)
  const decrement = useCounterStore(state => state.decrement)
  const zero = useCounterStore(state => state.zero) 
  */
  
  // Destructing causes the Controls component to be re-rendered every time the counter value changes
  /* const {increment, decrement, zero} = useCounterStore() */

  const { increment, decrement, zero } = useCounterControls()

  return (
    <div>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={zero}>zero</button>
    </div>
  )
}

export default Controls