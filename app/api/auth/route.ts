import jsonPlaceholderApi from '@/http/json-placeholder.api'
import { NextRequest, NextResponse } from 'next/server'
import { UserProps } from './auth.types'
import sessionDb from '../db/sessions/session.db'
import authSchema from '@/schemas/auth.schema'

async function POST(req: NextRequest) {
  try {
    const data = await authSchema.validate(await req.json())

    const users = await jsonPlaceholderApi.get<UserProps[]>('/users')
    const user = users.data.find((user) => user.email === data.email)

    if (!user) {
      return NextResponse.json({ status: 'danger', message: `User not found with this email ${data.email}` }, { status: 404 })
    }

    const OTP = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    await sessionDb.saveOTP(OTP, user)

    return NextResponse.json({ status: 'success', message: `Please check your mailbox for OTP Code - ${OTP}. (OTP Valid for 2 Minutes)` }, { status: 200 })
  } catch (e: unknown) {
    console.log(e)
    return NextResponse.json({ status: 'danger', message: (e as Record<string, string>).message || 'Unexcepted error occured please try again' }, { status: 401 })
  }
}

export { POST }
