import { string, object } from 'yup'

const otpVerifySchema = object({
  email: string().email('wrong mail format entered').required('Email field is required'),
  otp: string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('Please enter OTP Code')
    .length(4, 'OTP Code Should be equal to 4 character'),
})

export default otpVerifySchema
