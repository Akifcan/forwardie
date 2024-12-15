import appApi from '@/http/app.api'
import otpSchema from '@/schemas/otp.schema'
import useAuthStore from '@/store/auth/auth.store'
import { EnterOtpProps } from '@/app/api/auth/auth.types'
import { Button, Form, InputOtp } from '@nextui-org/react'
import { ClipboardEvent, FormEvent, useState } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { AlertStateProps } from '@/store/auth/auth.types'

export default function EnterOtpForm() {
  const router = useRouter()
  const { setEmail, setMessage, email } = useAuthStore()
  const [value, setValue] = useState('')
  const handleResetLoginState = () => {
    setEmail(undefined)
    setMessage(undefined)
  }

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

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const clipboard = e.clipboardData.getData('text')
    if (!clipboard) {
      return
    }
    const validData = otpSchema.validateSync({ otp: clipboard })
    handleOtpCode(validData.otp)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const validData = otpSchema.validateSync({ otp: value })
      handleOtpCode(validData.otp)
    } catch (e: unknown) {
      console.log(e)
      setMessage({ state: 'danger', text: (e as Record<string, string>).message })
    }
  }

  const handleOtpCode = async (otp: string) => {
    try {
      mutation.reset()
      mutation.mutate({ otp })
    } catch (e) {
      console.log(e)
      setMessage({ state: 'danger', text: (e as Record<string, string>).message })
    }
  }

  return (
    <Form onSubmit={onSubmit} className="w-full gap-5" key={'otp'}>
      {/* <Input onPaste={handlePaste} isRequired label="Enter OTP Code" labelPlacement="outside" name="otp" placeholder="Enter OTP Code" type="number" max={4} /> */}
      <InputOtp length={4} value={value} onValueChange={setValue} onPaste={handlePaste} />
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
