import useUserStore from '@/store/user/user.store'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { Key, ReactNode } from 'react'
import AddressIcon from './icons/address.icon'
import BuildingIcon from './icons/building.icon'
import PhoneIcon from './icons/phone.icon'
import WebIcon from './icons/web.icon'
import EmailIcon from './icons/email'

const ListboxWrapper = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">{children}</div>
)

export default function CompanyCard() {
  const { user } = useUserStore()

  const handleActions = (key: Key) => {
    switch (key) {
      case 'address':
        return window.open(`https://www.google.com.tr/maps/@${user?.address.geo.lat},${user?.address.geo.lng},18z?hl=en`, '_blank')
      case 'phone-number':
        return window.open(`tel:${user?.phone}`)
      case 'email':
        return window.open(`mailto:${user?.email}`)
      case 'website':
        return window.open(`https://www.${user?.website}`, '_blank')
      default:
        break
    }
  }

  return (
    <div className="mb-5 flex flex-col gap-3">
      <h4 className="text-2xl">Your Company:</h4>
      <ListboxWrapper>
        <Listbox aria-label="Company Info" onAction={handleActions}>
          <ListboxItem key={'address'}>
            <div className="flex flex-wrap items-center gap-3">
              <AddressIcon />
              <b>Address: </b>
              {user?.address.city} / {user?.address.street} / {user?.address.suite}
            </div>
          </ListboxItem>
          <ListboxItem key={'name'}>
            <div className="flex flex-wrap items-center gap-3">
              <BuildingIcon />
              <b>Name:</b> {user?.company.name} - {user?.company.bs} - {user?.company.catchPhrase}{' '}
            </div>
          </ListboxItem>
          <ListboxItem key={'phone-number'}>
            <div className="flex flex-wrap items-center gap-3">
              <PhoneIcon />
              <b>PhoneNumber:</b> {user?.phone}
            </div>
          </ListboxItem>
          <ListboxItem key={'website'}>
            <div className="flex flex-wrap items-center gap-3">
              <WebIcon />
              <b>Website:</b>
              {user?.website}
            </div>
          </ListboxItem>
          <ListboxItem key={'email'}>
            <div className="flex flex-wrap items-center gap-3">
              <EmailIcon />
              <b>Email:</b>
              {user?.email}
            </div>
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>
    </div>
  )
}
