'use client'
import useBearStore from '@/store/bears/bears.store'
import { Button } from '@nextui-org/button'
export default function Dashboard() {
  const { bears, resetBears } = useBearStore()

  return (
    <div>
      <p>{bears}</p>
      <Button color="primary" onPress={resetBears}>
        reset
      </Button>
    </div>
  )
}
