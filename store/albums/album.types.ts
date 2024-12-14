export interface AlbumProps {
  id: number
  title: string
}

export interface PhotoProps {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}
