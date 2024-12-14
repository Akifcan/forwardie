import appApi from '@/http/app.api'
import useAuthStore from '@/store/auth/auth.store'
import useUserStore from '@/store/user/user.store'
import { UserProps } from '@/app/api/auth/auth.types'
import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import LastCommentsList from '@/components/last-comments/last-comments.list'
import Header from '@/components/header'

export default function UserContainer({ children }: Readonly<{ children: ReactNode }>) {
  const { user, setUser } = useUserStore()
  const { setMessage } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      return
    }
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
      }
    }

    handleVerify()
  }, [])

  if (!user) {
    return (
      <div className="p-10 gap-5 h-lvh flex flex-col items-center justify-center">
        <Spinner color="primary" label="Logging In" labelColor="primary" size="lg" />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-10 py-10 px-5 container mx-auto h-lvh">
      <Header />
      <LastCommentsList />
      <div className="flex-1">{children}</div>
    </div>
  )
}
