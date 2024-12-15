import { UserProps } from '@/app/api/auth/auth.types'
import { useLogout } from '@/hooks/logout.hook'
import appApi from '@/http/app.api'
import { queryClient } from '@/providers/query.provider'
import useAuthStore from '@/store/auth/auth.store'
import { Button, User } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'

export default function AccountItem({ account, className }: Readonly<{ account: UserProps; className?: string }>) {
  const { setMessage } = useAuthStore()
  const { resetCredentials } = useLogout()
  const router = useRouter()

  const handleRemoveAccount = useMutation({
    mutationFn: () => {
      resetCredentials()
      return appApi.delete(`/api/auth/accounts/${account.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'accounts' })
    },
  })

  const handleLogin = useMutation({
    mutationFn: () => {
      setMessage({ state: 'success', text: 'Logging in' })

      return appApi.get(`/api/auth/accounts/${account.id}`)
    },
    onSuccess: () => {
      router.push('/')
      setMessage(undefined)
    },
    onError: () => {
      setMessage({ state: 'danger', text: 'Unexcepted error while login this account' })
    },
  })

  return (
    <div className={`flex flex-wrap gap-5 items-center border-2 px-2 py-2 border-sky-500 rounded-md ${className}`}>
      <User
        onClick={() => handleLogin.mutate()}
        key={account.id}
        className="cursor-pointer py-3 full-width justify-start w-full flex-1"
        description={account.email}
        name={account.name}
      />
      <Button size="sm" isLoading={handleRemoveAccount.isLoading} onPress={() => handleRemoveAccount.mutate()} color="danger" className="px-5">
        Logout this account
      </Button>
    </div>
  )
}
