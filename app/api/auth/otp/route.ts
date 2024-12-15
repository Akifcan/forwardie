import { NextRequest, NextResponse } from 'next/server'
import sessionDb from '../../db/sessions/session.db'
import otpVerifySchema from '@/schemas/otp-verify.schema'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'
import accountDb from '../../db/accounts/account.db'

async function POST(req: NextRequest) {
  try {
    const data = await otpVerifySchema.validate(await req.json())
    const user = await sessionDb.checkOTP(Number(data.otp), data.email)

    if (user === false) {
      return NextResponse.json({ status: 'danger', message: 'Entered wrong otp code' }, { status: 404 })
    }

    const cookieStore = await cookies()
    cookieStore.set('token', user.token)

    if (!cookieStore.get('session-id')?.value) {
      cookieStore.set('session-id', uuidv4())
    }

    accountDb.saveAccount(cookieStore.get('session-id')!.value, user.user.id)

    return NextResponse.json(
      { status: 'success', message: 'You are logging in', token: user.token, session: { userId: user.user.id, sessionId: cookieStore.get('session-id')?.value } },
      { status: 200 },
    )
  } catch (e: unknown) {
    console.log(e)
    return NextResponse.json({ status: 'danger', message: (e as Record<string, string>).message || 'Unexcepted error occured please try again' }, { status: 500 })
  }
}

export { POST }
