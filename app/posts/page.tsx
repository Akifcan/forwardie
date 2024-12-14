import jsonPlaceholderApi from '@/http/json-placeholder.api'
import Client from './client'
import { PostProps } from '@/store/posts/post.types'

export default async function Page() {
  try {
    const response = await jsonPlaceholderApi<PostProps[]>('/posts?_start=0&_limit=20')
    return <Client posts={response.data} />
  } catch (e) {
    console.log(e)
    throw new Error('fetch-error')
  }
}
