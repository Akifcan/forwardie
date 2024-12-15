import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import accountDb from '@/app/api/db/accounts/account.db'

async function DELETE(_: NextRequest, params: { params: Promise<{ id: number }> }) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session-id')
  if (!sessionId?.value) {
    return NextResponse.json({ deleted: false }, { status: 500 })
  }
  const { id } = await params.params
  await accountDb.removeAccount(sessionId.value, Number(id))
  return NextResponse.json({ deleted: true }, { status: 200 })
}

export { DELETE }
