import appApi from '@/http/app.api'
import otpSchema from '@/schemas/otp.schema'
import useAuthStore from '@/store/auth/auth.store'
import { EnterOtpProps } from '@/app/api/auth/auth.types'
import { Button, Form, Input } from '@nextui-org/react'
import { FormEvent } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { AlertStateProps } from '@/store/auth/auth.types'

export default function EnterOtpForm() {
  const router = useRouter()
  const { setEmail, setMessage, email } = useAuthStore()

  const handleResetLoginState = () => setEmail(undefined)

  const mutation = useMutation({
    mutationFn: (form: { otp: string }) => {
      return appApi.post<EnterOtpProps>('/api/auth/otp', { otp: form.otp, email })
    },
    onSuccess: (data) => {
      setMessage({ state: data.data.status, text: data.data.message })
      if (data.status === 200) {
        router.push('/')
      }
    },
    onError: (e: { response: { data: Record<string, string> } }) => {
      setMessage({ state: e.response.data.status as AlertStateProps, text: e.response.data?.message })
    },
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      mutation.reset()

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
