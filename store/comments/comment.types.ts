export interface CommentProps {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface CommentState {
  comments?: CommentProps[]
  setComments: (comments: CommentProps[]) => void
}
