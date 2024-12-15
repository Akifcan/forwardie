import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure, User } from '@nextui-org/react'
import MenuIcon from './icons/menu.icon'
import UserIcon from './icons/user.icon'
import useUserStore from '@/store/user/user.store'
import LogoutButton from './auth/logout.button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useUserStore()
  const router = useRouter()
  return (
    <>
      <Drawer isOpen={isOpen} size={'2xl'} placement="top" onClose={onClose}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">Forwardie</DrawerHeader>
          <DrawerBody>
            <Button onPress={() => router.push('/auth')} aria-label="Logout to app" color="default" variant="faded">
              <UserIcon />
              New user
            </Button>
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="flex items-center gap-5 flex-wrap">
        <Button onPress={onOpen} isIconOnly aria-label="Logout to app" color="warning" variant="faded">
          <MenuIcon />
        </Button>
        <Link href={'/'} className="mr-auto">
          <h1 className="text-3xl">Forwardie</h1>
        </Link>
        <User className="cursor-pointer" onClick={onOpen} description={user?.company.name} name={user?.name} />
        <LogoutButton />
      </div>
    </>
  )
}
