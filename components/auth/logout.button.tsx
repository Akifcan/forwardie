import { Button } from '@nextui-org/react'
import LogoutIcon from '../icons/logout.icon'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { useMutation } from 'react-query'
import appApi from '@/http/app.api'
import { useLogout } from '@/hooks/logout.hook'
export default function LogoutButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { logout } = useLogout()
  const mutation = useMutation({
    mutationFn: () => {
      return appApi.get('/api/auth/logout')
    },
    onSuccess: () => {
      logout()
    },
  })

  const handleLogout = () => {
    onOpenChange()
    mutation.mutate()
  }

  return (
    <>
      <Button isLoading={mutation.isLoading} onPress={onOpen} isIconOnly aria-label="Logout to app" color="warning" variant="faded">
        <LogoutIcon />
      </Button>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>Log out this account?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Go back
                </Button>
                <Button color="primary" onPress={handleLogout}>
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
