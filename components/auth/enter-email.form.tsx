import { AuthProps } from '@/app/api/auth/auth.types'
import appApi from '@/http/app.api'
import authSchema from '@/schemas/auth.schema'
import useAuthStore from '@/store/auth/auth.store'
import { Button, Form, Input } from '@nextui-org/react'
import { FormEvent } from 'react'
import { useMutation } from 'react-query'

export default function EnterEmailForm() {
  const { setMessage, setEmail } = useAuthStore()

  const mutation = useMutation({
    mutationFn: (form: { email: string }) => {
      return appApi.post<AuthProps>('/api/auth', form)
    },
    onSuccess: (data) => {
      setMessage({ state: data.data.status, text: data.data.message })
    },
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      mutation.reset()
      setMessage(undefined)

      const data = Object.fromEntries(new FormData(e.currentTarget))
      const validData = authSchema.validateSync(data)
      mutation.mutate(validData)
      setEmail(validData.email)
    } catch (e: unknown) {
      console.log(e)
      setMessage({ state: 'danger', text: (e as Record<string, string>).message })
    }
  }

  return (
    <Form onSubmit={onSubmit} className="w-full gap-5" key={'email'}>
      <Input isRequired label="Email" labelPlacement="outside" name="email" placeholder="Enter your email" type="email" />
      <Button isLoading={mutation.isLoading} type="submit" variant="bordered">
        Get Your OTP Code
      </Button>
    </Form>
  )
}
