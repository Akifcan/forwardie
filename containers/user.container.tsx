import appApi from '@/http/app.api'
import useAuthStore from '@/store/auth/auth.store'
import useUserStore from '@/store/user/user.store'
import { UserProps } from '@/app/api/auth/auth.types'
import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

export default function UserContainer({ children }: Readonly<{ children: ReactNode }>) {
  const { user, setUser } = useUserStore()
  const { setMessage } = useAuthStore()
  const router = useRouter()
  const [isLoggedIn, setLoggedIn] = useState<boolean>()

  useEffect(() => {
    const handleVerify = async () => {
      try {
        const response = await appApi.get<{ user?: UserProps }>('/api/auth/verify')
        if (!response.data?.user) {
          return router.push('/auth')
        }
        setUser(response.data.user)
      } catch (e) {
        setMessage({ state: 'danger', text: 'This is unexcepted behaviour please try to log in again.' })
        router.push('/auth')
      } finally {
        setLoggedIn(true)
      }
    }

    if (user) {
      return
    }

    handleVerify()
  }, [])

  if (isLoggedIn === undefined) {
    return (
      <div className="p-10 gap-5 h-lvh flex flex-col items-center justify-center">
        <Spinner color="primary" label="Logging In" labelColor="primary" size="lg" />
      </div>
    )
  }

  return children
}
