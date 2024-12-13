import { string, object } from 'yup'

const authSchema = object({
  email: string().email('Please enter valid email').required('Email field is required'),
})

export default authSchema
