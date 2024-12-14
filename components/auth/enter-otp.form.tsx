import { AuthProps } from '@/app/api/auth/auth.types'
import appApi from '@/http/app.api'
import otpSchema from '@/schemas/otp.schema'
import useAuthStore from '@/store/auth/auth.store'
import { Button, Form, Input } from '@nextui-org/react'
import { FormEvent } from 'react'
import { useMutation } from 'react-query'

export default function EnterOtpForm() {
  const { setEmail, setMessage } = useAuthStore()

  const handleResetLoginState = () => setEmail(undefined)

  const mutation = useMutation({
    mutationFn: (form: { otp: string }) => {
      return appApi.post<AuthProps>('/api/auth/otp', form)
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      mutation.reset()
      setMessage(undefined)

      const data = Object.fromEntries(new FormData(e.currentTarget))
      const validData = otpSchema.validateSync(data)
      mutation.mutate(validData)
    } catch (e: unknown) {
      console.log(e)
      setMessage({ state: 'danger', text: (e as Record<string, string>).message })
    }
  }

  return (
    <Form onSubmit={onSubmit} className="w-full gap-5" key={'otp'}>
      <Input isRequired label="Enter OTP Code" labelPlacement="outside" name="otp" placeholder="Enter OTP Code" type="number" max={4} />
      <div className="flex gap-3">
        <Button variant="solid" isLoading={mutation.isLoading} type="submit">
          Submit OTP Code
        </Button>
        <Button onPress={handleResetLoginState} type="button" variant="bordered">
          Use another email address
        </Button>
      </div>
    </Form>
  )
}
