export interface OtpProps {
  email: string
  otp: number
  expires: number
  user: UserProps
}

export interface AuthProps {
  message: string
  status: 'success' | 'danger'
}

export interface EnterOtpProps extends AuthProps {
  token: string
}

export interface AddressProps {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

export interface CompanyProps {
  name: string
  catchPhrase: string
  bs: string
}

export type Permissions = 'view-todo' | 'view-album' | 'view-post'

export interface UserProps {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: AddressProps
  company: CompanyProps
  roles: {
    userId: number
    permissions: Permissions[]
  }
}
