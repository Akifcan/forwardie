import { create } from 'zustand'
import { AuthState } from './auth.types'

const useAuthStore = create<AuthState>((set) => ({
  message: undefined,
  email: undefined,

  setMessage: (message) => set((state) => ({ message: (state.message = message) })),
  setEmail: (email) => set(() => ({ email })),
}))

export default useAuthStore
