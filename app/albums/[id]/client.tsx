'use client'
import GobackButton from '@/components/go-back.button'
import UserContainer from '@/containers/user.container'
import { PhotoProps } from '@/store/albums/album.types'
import styles from '@/styles/albums.module.css'
import Image from 'next/image'

export default function Client({ photos }: Readonly<{ photos: PhotoProps[] }>) {
  return (
    <UserContainer>
      <div className="mb-5">
        <GobackButton />
      </div>
      <section className={styles['album-container']}>
        {photos.map((photo) => {
          return (
            <div key={photo.id} className={styles['album-item']}>
              <Image layout="fill" src={photo.url} alt={photo.title} />
            </div>
          )
        })}
      </section>
    </UserContainer>
  )
}
