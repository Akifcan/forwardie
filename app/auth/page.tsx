'use client'
import { Form, Input, Button } from '@nextui-org/react'
import { FormEvent, useState } from 'react'
import { Alert } from '@nextui-org/react'
import { string, object } from 'yup'
import { useMutation } from 'react-query'
import axios from 'axios'

const formSchema = object({
  email: string().email('Please enter valid email').required('Email field is required'),
})

export default function Dashboard() {
  const [errorMessage, setErrorMessage] = useState<string>()

  const mutation = useMutation({
    mutationFn: (form: { email: string }) => {
      return axios.post<{ message: string; status: string }>('/api/auth', form)
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      mutation.reset()
      setErrorMessage(undefined)

      const data = Object.fromEntries(new FormData(e.currentTarget))
      const validData = formSchema.validateSync(data)
      mutation.mutate(validData)
    } catch (e: unknown) {
      console.log(e)
      setErrorMessage((e as Record<string, string>).message)
    }
  }

  return (
    <>
      <Form onSubmit={onSubmit} className="p-10 gap-5 h-lvh items-stretch justify-center">
        {errorMessage && (
          <div>
            <Alert color={'danger'} title={errorMessage} />
          </div>
        )}
        {mutation.isSuccess && (
          <div>
            <Alert color={mutation.data.data.status} title={mutation.data.data.message} />
          </div>
        )}
        <Input isRequired label="Email" labelPlacement="outside" name="email" placeholder="Enter your email" type="email" />
        <Button isLoading={mutation.isLoading} type="submit" variant="bordered">
          Submit
        </Button>
      </Form>
    </>
  )
}
