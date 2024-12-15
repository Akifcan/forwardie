import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function GET() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session-id')
  console.log(sessionId)
  if (!sessionId?.value) {
    return NextResponse.json({ accounts: [] }, { status: 200 })
  }
  return NextResponse.json({ accounts: [] }, { status: 200 })
}

export { GET }
