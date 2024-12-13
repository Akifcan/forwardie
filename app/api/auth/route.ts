import jsonPlaceholderApi from '@/http/json-placeholder.api'
import { NextRequest, NextResponse } from 'next/server'
import { UserProps } from './auth.types'

async function POST(req: NextRequest) {
  const data = await req.json()
  const OTP = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)

  const users = await jsonPlaceholderApi.get<UserProps[]>('/users')

  const user = users.data.find((user) => user.email === data.email)

  if (!user) {
    return NextResponse.json({ status: 'danger', message: `User not found with this email ${data.email}` }, { status: 200 })
  }

  return NextResponse.json({ status: 'success', message: `Please check your mailbox for OTP Code - ${OTP}` }, { status: 200 })
}

export { POST }
