import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useCounterStore = create(set => ({
  counter: 0,
  changes: 0,
  actions: {
      increment: () => set(state => ({ 
        counter: state.counter + 1,
        changes: state.changes + 1
      })),
      decrement: () => set(state => ({ 
        counter: state.counter - 1,
        changes: state.changes + 1
      })),
      zero: () => set(state => ({ 
        counter: 0,
        changes: state.changes + 1
      })),
  }
}))

export const useValues = () => 
  useCounterStore(
    useShallow((state) => ({
      counter: state.counter,
      changes: state.changes
    }))
  )
export const useCounterControls = () => useCounterStore(state => state.actions)
  
  /* PREVIOUS 
  increment: () => set(state => ({ counter: state.counter + 1 })),
  decrement: () => set(state => ({ counter: state.counter - 1 })),
  zero: () => set(() => ({ counter: 0 })), 
  */

  /* 
    actions: {
      increment: () => set(state => ({ counter: state.counter + 1 })),
      decrement: () => set(state => ({ counter: state.counter - 1 })),
      zero: () => set(() => ({ counter: 0 })),
    }
    
    and then in the component where you want to use the states:
    const { increment, decrement, zero } = useCounterStore(state => state.actions)
  */


// BEST PRACTICES:
/* 
Not advisable to export the function defining the entire state for use throughout the application. Instead, smaller views that expose only the necessary parts of the state should be created from it. For example:

export const useCounter = () => useCounterStore(state => state.counter)
export const useCounterControls = () => useCounterStore(state => state.actions)

Inside the component where you want to access the parts of the state, do this:
import { useCounter } from './store'

const Display = () => {
  const counter = useCounter()
  ...
}
*/