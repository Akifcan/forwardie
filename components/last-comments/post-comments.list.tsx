import jsonPlaceholderApi from '@/http/json-placeholder.api'
import { CommentProps } from '@/store/comments/comment.types'
import { Alert, Skeleton, User } from '@nextui-org/react'
import { useQuery } from 'react-query'
import { Virtuoso } from 'react-virtuoso'
export default function PostComments({ postId }: Readonly<{ postId: number }>) {
  const { data, isError, isLoading } = useQuery<{ data: CommentProps[] }>({
    queryKey: [`post-comments-${postId}`],
    queryFn: () => jsonPlaceholderApi.get(`/comments?postId=${postId}`),
  })

  return (
    <div style={{ width: '100%' }}>
      {isError && <Alert color="danger" title="Fetching error occured while loading comments" />}
      {isLoading && (
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      )}
      {data?.data && !isLoading && (
        <Virtuoso
          style={{ minHeight: '400px', height: '400px' }}
          totalCount={data.data.length}
          itemContent={(index) => {
            const comment = data.data[index]
            console.log(comment)
            return <User className="cursor-pointer py-3" description={comment.body} name={comment.name} />
          }}
        />
      )}
    </div>
  )
}
