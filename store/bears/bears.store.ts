import { create } from 'zustand'

interface BearState {
  bears: number
  increase: () => void
  resetBears: () => void
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  resetBears: () => set((state) => ({ bears: 0 })),
}))

export default useBearStore
