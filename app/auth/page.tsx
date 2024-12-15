'use client'
import { Alert } from '@nextui-org/react'
import EnterOtpForm from '@/components/auth/enter-otp.form'
import EnterEmailForm from '@/components/auth/enter-email.form'
import useAuthStore from '@/store/auth/auth.store'
import AccountsList from '@/components/accounts/accounts.list'

export default function Dashboard() {
  const { message, email } = useAuthStore()

  return (
    <div className="p-10 gap-5 h-lvh flex flex-col items-center justify-center">
      <AccountsList />
      {message && (
        <div className="w-full self-start">
          <Alert color={message.state} title={message.text} />
        </div>
      )}
      {!email ? <EnterEmailForm /> : <EnterOtpForm />}
    </div>
  )
}
