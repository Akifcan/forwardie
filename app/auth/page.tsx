'use client'
import { useEffect } from 'react'
import { Alert } from '@nextui-org/react'
import EnterOtpForm from '@/components/auth/enter-otp.form'
import EnterEmailForm from '@/components/auth/enter-email.form'
import useAuthStore from '@/store/auth/auth.store'

export default function Dashboard() {
  const { message, state, setMessage } = useAuthStore()

  useEffect(() => {
    setMessage(undefined)
  }, [state, setMessage])

  return (
    <div className="p-10 gap-5 h-lvh flex flex-col items-center justify-center">
      {message && (
        <div className="w-full">
          <Alert color={message.state} title={message.text} />
        </div>
      )}
      {state === 'sign-in' ? <EnterEmailForm /> : <EnterOtpForm />}
    </div>
  )
}
