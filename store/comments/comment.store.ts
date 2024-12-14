import { create } from 'zustand'
import { CommentState } from './comment.types'

const useCommentStore = create<CommentState>((set) => ({
  comments: undefined,
  setComments: (comments) => set(() => ({ comments })),
}))

export default useCommentStore
