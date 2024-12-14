'use client'
import UserContainer from '@/containers/user.container'
import Link from 'next/link'

export default function Albums() {
  return (
    <UserContainer>
      <div>
        <Link href={'/dashboard'}>albums!</Link>
      </div>
    </UserContainer>
  )
}
