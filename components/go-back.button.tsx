import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import GoBackIcon from './icons/go-back.icon'

export default function GobackButton() {
  const router = useRouter()

  return (
    <Button startContent={<GoBackIcon />} onPress={() => router.back()} color="primary">
      Go back
    </Button>
  )
}
