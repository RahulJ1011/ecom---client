import {create} from 'zustand'
const useHistoryStore  = create((set,get)=> ({
    history: [],
    addHistory: (newItem)=>
        set((state)=> ({
            history:[...state.history,newItem]
        })),
    
      
}))

export default useHistoryStore;