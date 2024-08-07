import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  getToken: () => get().token,
  resetToken: () => set({ token: null }),

  userId: null,
  setUserId: (newUserId) => set({ userId: newUserId }),
  getUserId: () => get().userId,

  userName :null,
  setUserName: (newUserName)=> set({userName:newUserName}),
  getUserName: ()=> get().userName,
  
  id: null,
  setId: (newId) => set({ id: newId }),
  getId: () => get().id,

  prods: [],
  setProds: (items) => set((state) => ({
    prods: [...state.prods, ...items]
  })),
  resetProds: () => set({ prods: [] })
}));

export default useAuthStore;
