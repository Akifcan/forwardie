import { string, object } from 'yup'

const otpSchema = object({
  otp: string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('Please enter OTP Code')
    .length(4, 'OTP Code Should be equal to 4 character'),
})

export default otpSchema
