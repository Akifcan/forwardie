import { AuthProps } from '@/app/api/auth/auth.types'
import appApi from '@/http/app.api'
import authSchema from '@/schemas/auth.schema'
import { Button, Form, Input } from '@nextui-org/react'
import { FormEvent } from 'react'
import { useMutation } from 'react-query'

export default function EnterOtpForm() {
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
    <Form onSubmit={onSubmit} className="w-full gap-5">
      <Input isRequired label="Enter OTP Code" labelPlacement="outside" name="otp" placeholder="Enter OTP Code" type="number" max={4} />
      <Button isLoading={mutation.isLoading} type="submit" variant="bordered">
        Submit OTP Code
      </Button>
    </Form>
  )
}
