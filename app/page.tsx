'use client'
import AlbumsList from '@/components/dashboard/albums.list'
import PostsList from '@/components/dashboard/posts.list'
import TodosList from '@/components/dashboard/todos.list'
import Header from '@/components/header'
import LastCommentsList from '@/components/last-comments/last-comments.list'
import UserContainer from '@/containers/user.container'
import { useResponsive } from '@/hooks/responsive.hook'

export default function Home() {
  const { isMobile } = useResponsive()
  return (
    <UserContainer>
      <div className="flex flex-col gap-10 py-10 px-5 container mx-auto">
        <Header />
        <LastCommentsList />
        <div className={`grid gap-5 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          <PostsList />
          <AlbumsList />
          <TodosList />
        </div>
        {/* <Link href={'/'}>dashboard</Link>
        <Link href={'/albums'}>albums</Link>
        <p>{JSON.stringify(user)}</p> */}
      </div>
    </UserContainer>
  )
}
