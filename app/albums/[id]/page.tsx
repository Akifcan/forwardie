import jsonPlaceholderApi from '@/http/json-placeholder.api'
import Client from './client'
import { PhotoProps } from '@/store/albums/album.types'

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params
    const response = await jsonPlaceholderApi<PhotoProps[]>(`/photos?albumId=${id}`)
    return <Client photos={response.data} />
  } catch (e) {
    console.log(e)
    throw new Error('fetch-error')
  }
}
