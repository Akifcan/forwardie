import jsonPlaceholderApi from '@/http/json-placeholder.api'
import Client from './client'
import { AlbumProps } from '@/store/albums/album.types'

export default async function Page() {
  try {
    const response = await jsonPlaceholderApi<AlbumProps[]>('/albums?_start=0&_limit=20')
    return <Client albums={response.data} />
  } catch (e) {
    console.log(e)
    throw new Error('fetch-error')
  }
}
