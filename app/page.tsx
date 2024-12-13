'use client'
import useBearStore from '@/store/bears/bears.store'
import Link from 'next/link'

export default function Home() {
  const { bears, increase } = useBearStore()

  return (
    <div>
      <Link href={'/dashboard'}>dashboard</Link>
      <p>{bears}</p>
      <button onClick={increase}>inc</button>
    </div>
  )
}
