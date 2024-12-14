import { AuthProps } from '@/app/api/auth/auth.types'
import appApi from '@/http/app.api'
import authSchema from '@/schemas/auth.schema'
import useAuthStore from '@/store/auth/auth.store'
import { Button, Form, Input } from '@nextui-org/react'
import { FormEvent } from 'react'
import { useMutation } from 'react-query'

export default function EnterOtpForm() {
  const { setState } = useAuthStore()

  const handleResetLoginState = () => setState('sign-in')

  const mutation = useMutation({
    mutationFn: (form: { email: string }) => {
      return appApi.post<AuthProps>('/api/auth', form)
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      mutation.reset()
      //   setErrorMessage(undefined)

      const data = Object.fromEntries(new FormData(e.currentTarget))
      const validData = authSchema.validateSync(data)
      mutation.mutate(validData)
    } catch (e: unknown) {
      console.log(e)
      //   setErrorMessage((e as Record<string, string>).message)
    }
  }

  return (
    <Form onSubmit={onSubmit} className="w-full gap-5" key={'otp'}>
      <Input isRequired label="Enter OTP Code" labelPlacement="outside" name="otp" placeholder="Enter OTP Code" type="number" max={4} />
      <div className="flex gap-3">
        <Button variant="solid" isLoading={mutation.isLoading} type="submit">
          Submit OTP Code
        </Button>
        <Button onPress={handleResetLoginState} type="submit" variant="bordered">
          Use another email address
        </Button>
      </div>
    </Form>
  )
}
