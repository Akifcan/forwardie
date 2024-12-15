import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import accountDb from '@/app/api/db/accounts/account.db'
import jsonPlaceholderApi from '@/http/json-placeholder.api'
import session from '@/app/api/db/sessions/session.db'

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

async function GET(_: NextRequest, params: { params: Promise<{ id: number }> }) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session-id')
  if (!sessionId?.value) {
    return NextResponse.json({ deleted: false }, { status: 500 })
  }
  const { id } = await params.params

  const account = await accountDb.getAccount(sessionId.value, Number(id))
  if (!account) {
    return NextResponse.json({ message: 'Account not found' }, { status: 404 })
  }

  const user = await jsonPlaceholderApi.get(`/users/${account.id}`)
  if (!user.data) {
    return NextResponse.json({ message: 'Account not found' }, { status: 404 })
  }

  const signIn = await session.signIn(user.data)
  cookieStore.set('token', signIn.token)

  return NextResponse.json(
    { status: 'success', message: 'You are logging in', token: signIn.token, session: { userId: signIn.user.id, sessionId: cookieStore.get('session-id')?.value } },
    { status: 200 },
  )
}

export { DELETE, GET }
