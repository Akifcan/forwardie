import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react'
import List from '../list'
import { useQuery } from 'react-query'
import jsonPlaceholderApi from '@/http/json-placeholder.api'
import { AlbumProps } from '@/store/albums/album.types'
import PhotoIcon from '../icons/photo.icon'
import { useRouter } from 'next/navigation'
export default function AlbumsList() {
  const router = useRouter()

  const { data, isError, isLoading } = useQuery<{ data: AlbumProps[] }>({
    queryKey: ['albums-dashboard'],
    queryFn: () => jsonPlaceholderApi.get('/albums?_start=0&_limit=5'),
  })

  return (
    <List title="Albums" onPress={() => router.push('/albums')} isLoading={isLoading} isError={isError}>
      {data?.data && (
        <Table aria-label="Last 5 Album">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {data.data.map((album) => {
              return (
                <TableRow key={album.id}>
                  <TableCell>{album.id}</TableCell>
                  <TableCell>{album.title}</TableCell>
                  <TableCell>
                    <Button startContent={<PhotoIcon />} onPress={() => router.push('/albums')}>
                      View Photos
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </List>
  )
}
