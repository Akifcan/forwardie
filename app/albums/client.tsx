'use client'
import PhotoIcon from '@/components/icons/photo.icon'
import UserContainer from '@/containers/user.container'
import jsonPlaceholderApi from '@/http/json-placeholder.api'
import { AlbumProps } from '@/store/albums/album.types'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useMutation } from 'react-query'

export default function Client({ albums }: Readonly<{ albums: AlbumProps[] }>) {
  const [list, setList] = useState<AlbumProps[]>(albums)
  const page = useRef(0)
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: () => {
      page.current += 20
      console.log(`/albums?_start=${page.current}&_limit=${page.current + 20}`)
      return jsonPlaceholderApi.get<AlbumProps[]>(`/albums?_start=${page.current}&_limit=20`)
    },
    onSuccess: (data) => {
      setList((prev) => [...prev, ...data.data])
    },
    onError: (e: { response: { data: Record<string, string> } }) => {
      alert(e.response.data?.message)
    },
  })

  return (
    <UserContainer>
      <div className="flex flex-col gap-3 pb-10">
        <Table aria-label="Last 5 Posts">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {list.map((album) => {
              return (
                <TableRow key={album.id}>
                  <TableCell>{album.id}</TableCell>
                  <TableCell>{album.title}</TableCell>
                  <TableCell>
                    <Button startContent={<PhotoIcon />} onPress={() => router.push(`/albums/${album.id}`)}>
                      View Photos
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Button isLoading={mutation.isLoading} onPress={() => mutation.mutate()} className="self-center" style={{ alignSelf: 'center' }}>
          Load More
        </Button>
      </div>
    </UserContainer>
  )
}
