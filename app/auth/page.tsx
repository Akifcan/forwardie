'use client'
import { Form, Input, Button } from '@nextui-org/react'
import { FormEvent, useState } from 'react'
import { Alert } from '@nextui-org/react'
import { string, object } from 'yup'

const formSchema = object({
  email: string().email('Please enter valid email').required('Email field is required'),
})

export default function Dashboard() {
  const [errorMessage, setErrorMessage] = useState<string>()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = Object.fromEntries(new FormData(e.currentTarget))
      const validData = formSchema.validateSync(data)
      console.log(validData)
    } catch (e: unknown) {
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
        <Input isRequired label="Email" labelPlacement="outside" name="email" placeholder="Enter your email" type="email" />
        <Button isLoading={false} type="submit" variant="bordered">
          Submit
        </Button>
      </Form>
    </>
  )
}
