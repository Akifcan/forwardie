'use client'
import { UserProps } from '@/app/api/auth/auth.types'
import UserContainer from '@/containers/user.container'
import { PostProps } from '@/store/posts/post.types'
import { Button, User } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function Client({ user, post }: Readonly<{ user: UserProps; post: PostProps }>) {
  const router = useRouter()
  return (
    <UserContainer>
      <div className="flex flex-col items-start gap-5">
        <User description={user.company.name} name={user.name} />
        <h1 className="text-3xl capitalize">{post.title}</h1>
        <p className="text-lg">{post.body}</p>
        <Button onPress={() => router.back()} color="primary">
          Go back
        </Button>
      </div>
    </UserContainer>
  )
}
