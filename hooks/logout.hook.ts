import useAuthStore from '@/store/auth/auth.store'
import useUserStore from '@/store/user/user.store'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const router = useRouter()
  const { setMessage, setEmail } = useAuthStore()
  const { setUser } = useUserStore()

  const resetCredentials = () => {
    setMessage({ state: 'primary', text: 'See you again' })
    setEmail(undefined)
    setUser(undefined)
  }

  const logout = () => {
    router.push('/auth')
    resetCredentials()
  }

  return { logout, resetCredentials }
}
