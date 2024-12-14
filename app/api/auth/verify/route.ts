import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json({ user: undefined }, { status: 401 })
    }

    const decoded = jwt.verify(token.value, process.env.AUTH_SECRET!)

    return NextResponse.json({ user: decoded }, { status: 200 })
  } catch (e: unknown) {
    return NextResponse.json({ status: 'danger', message: (e as Record<string, string>).message || 'Unexcepted error occured please try again' }, { status: 500 })
  }
}

export { GET }
