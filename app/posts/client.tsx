'use client'
import BookIcon from '@/components/icons/book.icon'
import UserContainer from '@/containers/user.container'
import jsonPlaceholderApi from '@/http/json-placeholder.api'
import { PostProps } from '@/store/posts/post.types'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react'
import { useRef, useState } from 'react'
import { useMutation } from 'react-query'

export default function Client({ posts }: Readonly<{ posts: PostProps[] }>) {
  const [list, setList] = useState<PostProps[]>(posts)
  const page = useRef(0)

  const mutation = useMutation({
    mutationFn: () => {
      page.current += 20
      console.log(`/posts?_start=${page.current}&_limit=${page.current + 20}`)
      return jsonPlaceholderApi.get<PostProps[]>(`/posts?_start=${page.current}&_limit=20`)
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
      <div className="flex flex-col gap-3">
        <Table aria-label="Last 5 Posts">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {list.map((post) => {
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
        <Button isLoading={mutation.isLoading} onPress={() => mutation.mutate()} className="self-center" style={{ alignSelf: 'center' }}>
          Load More
        </Button>
      </div>
    </UserContainer>
  )
}
