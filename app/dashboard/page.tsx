'use client'
import useBearStore from '@/store/bears/bears.store'

export default function Dashboard() {
  const { bears, resetBears } = useBearStore()

  return (
    <div>
      <p>{bears}</p>
      <button onClick={resetBears}>reset</button>
    </div>
  )
}
