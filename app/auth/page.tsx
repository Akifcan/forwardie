'use client'
import { Alert } from '@nextui-org/react'
import EnterOtpForm from '@/components/auth/enter-otp.form'
import EnterEmailForm from '@/components/auth/enter-email.form'
import useAuthStore from '@/store/auth/auth.store'
import { useQuery } from 'react-query'
import appApi from '@/http/app.api'

export default function Dashboard() {
  const { message, email } = useAuthStore()

  useQuery({
    queryKey: ['accounts'],
    queryFn: () => appApi.get('/api/auth/accounts'),
  })

  return (
    <div className="p-10 gap-5 h-lvh flex flex-col items-center justify-center">
      {message && (
        <div className="w-full">
          <Alert color={message.state} title={message.text} />
        </div>
      )}
      {!email ? <EnterEmailForm /> : <EnterOtpForm />}
    </div>
  )
}
