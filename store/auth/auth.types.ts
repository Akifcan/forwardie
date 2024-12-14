interface MessageProps {
  state: 'success' | 'danger'
  text: string
}

type LoginState = 'sign-in' | 'otp'

interface AuthState {
  state: LoginState
  message?: MessageProps

  setMessage: (message?: MessageProps) => void
  setState: (state: LoginState) => void
}
