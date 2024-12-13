interface MessageProps {
  state: 'success' | 'danger'
  text: string
}

interface AuthState {
  message?: MessageProps
  setMessage: (message?: MessageProps) => void
}
