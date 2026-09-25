import { useValues } from '../store/counterStore'

const Display = () => {
  const values = useValues()

  return (
    <>
      <div>Counter: {values.counter}</div>
      <div>Changes: {values.changes}</div>
    </>
  )
}

export default Display