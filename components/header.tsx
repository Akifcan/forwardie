import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure, User } from '@nextui-org/react'
import LogoutIcon from './icons/logout.icon'
import MenuIcon from './icons/menu.icon'
import UserIcon from './icons/user.icon'
import useUserStore from '@/store/user/user.store'

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useUserStore()
  return (
    <>
      <Drawer isOpen={isOpen} size={'2xl'} placement="top" onClose={onClose}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">Forwardie</DrawerHeader>
          <DrawerBody>
            <Button aria-label="Logout to app" color="default" variant="faded">
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
      <div className="flex items-center gap-5">
        <Button onPress={onOpen} isIconOnly aria-label="Logout to app" color="warning" variant="faded">
          <MenuIcon />
        </Button>
        <h1 className="text-3xl mr-auto">Forwardie</h1>
        <User description={user?.company.name} name={user?.name} />
        <Button isIconOnly aria-label="Logout to app" color="warning" variant="faded">
          <LogoutIcon />
        </Button>
      </div>
    </>
  )
}
