import { UserProps } from '@/app/api/auth/auth.types'
import appApi from '@/http/app.api'
import { Alert, Divider, Skeleton } from '@nextui-org/react'
import { useQuery } from 'react-query'
import AccountItem from './account.item'
import { Virtuoso } from 'react-virtuoso'

export default function AccountsList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => appApi.get<{ accounts: UserProps[] }>('/api/auth/accounts'),
  })

  if (isError) {
    return <Alert color="danger" title="Fetching error occured while loading your acconunts" />
  }

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-5">
        <Skeleton className="w-full h-10 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
    )
  }

  if (!data?.data.accounts.length) {
    return null
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <h3 className="text-xl">Your Accounts</h3>
      <Divider />
      <Virtuoso
        style={{ height: '200px' }}
        totalCount={data.data.accounts.length}
        itemContent={(index) => {
          const account = data.data.accounts[index]
          return <AccountItem account={account} key={account.id} className={index !== 0 ? 'mt-3' : undefined} />
        }}
      />
    </div>
  )
}
