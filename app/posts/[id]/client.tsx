'use client'
import { UserProps } from '@/app/api/auth/auth.types'
import GobackButton from '@/components/go-back.button'
import UserContainer from '@/containers/user.container'
import { PostProps } from '@/store/posts/post.types'
import { User } from '@nextui-org/react'

export default function Client({ user, post }: Readonly<{ user: UserProps; post: PostProps }>) {
  return (
    <UserContainer>
      <div className="flex flex-col items-start gap-5">
        <User description={user.company.name} name={user.name} />
        <h1 className="text-3xl capitalize">{post.title}</h1>
        <p className="text-lg">{post.body}</p>
        <GobackButton />
      </div>
    </UserContainer>
  )
}
