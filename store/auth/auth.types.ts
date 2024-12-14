export type AlertStateProps = 'success' | 'danger'

interface MessageProps {
  state: AlertStateProps
  text: string
}

interface AuthState {
  message?: MessageProps
  email?: string

  setMessage: (message?: MessageProps) => void
  setEmail: (email?: string) => void
}
