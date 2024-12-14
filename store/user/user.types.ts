import { UserProps } from '@/app/api/auth/auth.types'

export interface UserState {
  user?: UserProps
  setUser: (user: UserProps) => void
}
