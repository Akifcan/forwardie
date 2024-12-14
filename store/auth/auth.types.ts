export type AlertStateProps = 'success' | 'danger' | 'primary'

interface MessageProps {
  state: AlertStateProps
  text: string
}

export interface AuthState {
  message?: MessageProps
  email?: string

  setMessage: (message?: MessageProps) => void
  setEmail: (email?: string) => void
}
