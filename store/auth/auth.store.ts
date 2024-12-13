import { create } from 'zustand'

const useAuthStore = create<AuthState>((set) => ({
  message: undefined,
  setMessage: (message) => set((state) => ({ message: (state.message = message) })),
}))

export default useAuthStore
