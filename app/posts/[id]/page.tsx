import jsonPlaceholderApi from '@/http/json-placeholder.api'
import Client from './client'
import { notFound } from 'next/navigation'
import { PostProps } from '@/store/posts/post.types'
import { UserProps } from '@/app/api/auth/auth.types'

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  try {
    const post = await jsonPlaceholderApi.get<PostProps>(`/posts/${id}`)
    const user = await jsonPlaceholderApi.get<UserProps>(`/users/${post.data.userId}`)
    return <Client user={user.data} post={post.data} />
  } catch (e) {
    console.log(e)
    notFound()
  }
}
