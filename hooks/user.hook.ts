import useAuthStore from '@/store/auth/auth.store'
import useUserStore from '@/store/user/user.store'
import { useRouter } from 'next/navigation'

export const useUser = () => {
  const router = useRouter()
  const { setMessage, setEmail } = useAuthStore()
  const { setUser } = useUserStore()

  const logout = () => {
    setMessage({ state: 'primary', text: 'See you again' })
    setEmail(undefined)
    setUser(undefined)
  }

  return {
    logout,
  }
}
