import jsonPlaceholderApi from '@/http/json-placeholder.api'
import useCommentStore from '@/store/comments/comment.store'
import { CommentProps } from '@/store/comments/comment.types'
import useUserStore from '@/store/user/user.store'
import { Alert, Skeleton, User } from '@nextui-org/react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

export default function LastCommentsList() {
  const { comments, setComments } = useCommentStore()
  const { user } = useUserStore()

  const { isError, refetch } = useQuery<{ data: CommentProps[] }>({
    enabled: false,
    queryKey: ['last-comments-list'],
    queryFn: () => jsonPlaceholderApi.get(`/comments?email=${user?.email}&_limit=5`),
  })

  useEffect(() => {
    refetch().then((response) => {
      if (response.data!.data) {
        setComments(response.data!.data)
      }
    })
  }, [])

  return (
    <div className="flex flex-col gap-5 items-start">
      {isError && <Alert color="danger" title="Fetching error occured while loading comments" />}
      {comments && (
        <>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return <User key={comment.id} description={<p className="text-xl">{comment.body}</p>} name={comment.name} />
            })
          ) : (
            <Alert color={'primary'} title={"You don't have comment yet"} />
          )}
        </>
      )}

      {!comments && (
        <div className="flex flex-col gap-3 w-full">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      )}
    </div>
  )
}
