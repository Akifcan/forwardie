'use client'
import AlbumsList from '@/components/dashboard/albums.list'
import PostsList from '@/components/dashboard/posts.list'
import TodosList from '@/components/dashboard/todos.list'
import Header from '@/components/header'
import UserContainer from '@/containers/user.container'

export default function Home() {
  return (
    <UserContainer>
      <div className="flex flex-col gap-10 py-10 px-5 container mx-auto">
        <Header />
        <div className="grid gap-5 grid-cols-3">
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
