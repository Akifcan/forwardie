interface MessageProps {
  state: 'success' | 'danger'
  text: string
}

interface AuthState {
  message?: MessageProps
  email?: string

  setMessage: (message?: MessageProps) => void
  setEmail: (email?: string) => void
}
