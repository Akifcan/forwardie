'use client'
import AlbumsList from '@/components/dashboard/albums.list'
import PostsList from '@/components/dashboard/posts.list'
import TodosList from '@/components/dashboard/todos.list'
import UserContainer from '@/containers/user.container'
import { useResponsive } from '@/hooks/responsive.hook'

export default function Home() {
  const { isMobile } = useResponsive()
  return (
    <UserContainer>
      <div className={`grid gap-5 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
        <PostsList />
        <AlbumsList />
        <TodosList />
      </div>
    </UserContainer>
  )
}
