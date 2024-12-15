import { UserProps } from '@/app/api/auth/auth.types'
import appApi from '@/http/app.api'
import { queryClient } from '@/providers/query.provider'
import { Button, User } from '@nextui-org/react'
import { useMutation } from 'react-query'

export default function AccountItem({ account, className }: Readonly<{ account: UserProps; className?: string }>) {
  const mutation = useMutation({
    mutationFn: () => {
      return appApi.delete(`/api/auth/accounts/${account.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'accounts' })
    },
  })

  return (
    <div className={`flex flex-wrap gap-5 items-center border-2 px-2 py-2 border-sky-500 rounded-md ${className}`}>
      <User key={account.id} className="cursor-pointer py-3 full-width justify-start w-full flex-1" description={account.email} name={account.name} />
      <Button size="sm" isLoading={mutation.isLoading} onPress={() => mutation.mutate()} color="danger" className="px-5">
        Logout this account
      </Button>
    </div>
  )
}
