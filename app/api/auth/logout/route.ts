import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function GET() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  return NextResponse.json({ status: 'success', message: 'You are logging out' }, { status: 200 })
}

export { GET }
