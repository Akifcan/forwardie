import { create } from 'zustand'

const useAuthStore = create<AuthState>((set) => ({
  message: undefined,
  state: 'sign-in',

  setMessage: (message) => set((state) => ({ message: (state.message = message) })),
  setState: (message) => set(() => ({ state: message })),
}))

export default useAuthStore
