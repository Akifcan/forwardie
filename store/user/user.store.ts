import { create } from 'zustand'
import { UserState } from './user.types'

const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
}))

export default useUserStore
