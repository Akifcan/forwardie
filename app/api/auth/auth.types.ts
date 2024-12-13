export interface OtpProps {
  email: string
  otp: number
  expires: number
}

export interface AuthProps {
  message: string
  status: string
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

export interface UserProps {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: AddressProps
  company: CompanyProps
}
