import { useNoteActions } from '../store/store'

const VisibilityFilter = () => {
  const { setFilter } = useNoteActions()

  return (
    <div className='visibilityFilter ml-5 mb-5'>
      <input 
        type='radio'
        name='filter'
        onChange={() => setFilter('all')}
        defaultChecked
      /> all      
      <input 
        type='radio'
        name='filter'
        onChange={() => setFilter('important')}        
      /> important      
      <input 
        type='radio'
        name='filter'
        onChange={() => setFilter('unimportant')}        
      /> unimportant
    </div>
  )
}

export default VisibilityFilter