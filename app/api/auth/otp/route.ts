import { NextRequest, NextResponse } from 'next/server'
import sessionDb from '../../db/sessions/session.db'
import otpVerifySchema from '@/schemas/otp-verify.schema'
import { cookies } from 'next/headers'

async function POST(req: NextRequest) {
  try {
    const data = await otpVerifySchema.validate(await req.json())
    const jwt = await sessionDb.checkOTP(Number(data.otp), data.email)

    if (jwt === false) {
      return NextResponse.json({ status: 'danger', message: 'Entered wrong otp code' }, { status: 404 })
    }

    const cookieStore = await cookies()
    cookieStore.set('token', jwt)

    return NextResponse.json({ status: 'success', message: 'You are logging in', token: jwt }, { status: 200 })
  } catch (e: unknown) {
    console.log(e)
    return NextResponse.json({ status: 'danger', message: (e as Record<string, string>).message || 'Unexcepted error occured please try again' }, { status: 500 })
  }
}

export { POST }
