'use client'
import { useState } from 'react'
import { Alert } from '@nextui-org/react'
import EnterOtpForm from '@/components/auth/enter-otp.form'
import EnterEmailForm from '@/components/auth/enter-email.form'
import useAuthStore from '@/store/auth/auth.store'

export default function Dashboard() {
  const [state, setState] = useState<'sign-in' | 'otp'>('sign-in')
  const { message } = useAuthStore()

  const handleOtpState = () => setState('otp')

  return (
    <div className="p-10 gap-5 h-lvh flex flex-col items-center justify-center">
      {message && (
        <div className="w-full">
          <Alert color={message.state} title={message.text} />
        </div>
      )}
      {state === 'sign-in' ? <EnterEmailForm handleSubmit={handleOtpState} /> : <EnterOtpForm />}
    </div>
  )
}
