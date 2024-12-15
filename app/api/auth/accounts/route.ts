import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function GET() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session-id')
  if (!sessionId) {
    return NextResponse.json({ accounts: [] }, { status: 200 })
  }
  return NextResponse.json({ accounts: [] }, { status: 200 })
}

export { GET }
