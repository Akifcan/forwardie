import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react'
import List from '../list'
import { useQuery } from 'react-query'
import jsonPlaceholderApi from '@/http/json-placeholder.api'
import { PostProps } from '@/store/posts/post.types'
import BookIcon from '../icons/book.icon'
export default function PostsList() {
  const { data, isError, isLoading } = useQuery<{ data: PostProps[] }>({
    queryKey: ['posts-dashboard'],
    queryFn: () => jsonPlaceholderApi.get('/posts?_start=0&_limit=5'),
  })

  return (
    <List title="Posts" onPress={() => {}} isLoading={isLoading} isError={isError}>
      {data?.data && (
        <Table aria-label="Last 5 Posts">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {data.data.map((post) => {
              return (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    <Button startContent={<BookIcon />} onPress={() => {}}>
                      View Detail
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
