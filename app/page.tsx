'use client'
import UserContainer from '@/containers/user.container'
import useUserStore from '@/store/user/user.store'
import Link from 'next/link'

export default function Home() {
  const { user } = useUserStore()

  return (
    <UserContainer>
      <div>
        <Link href={'/'}>dashboard</Link>
        <Link href={'/albums'}>albums</Link>
        <p>{JSON.stringify(user)}</p>
      </div>
    </UserContainer>
  )
}
