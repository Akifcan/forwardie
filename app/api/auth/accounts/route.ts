import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import accountDb from '../../../../db/accounts/account.db'
import jsonPlaceholderApi from '@/http/json-placeholder.api'

async function GET() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session-id')
  if (!sessionId?.value) {
    return NextResponse.json({ accounts: [] }, { status: 200 })
  }
  const accounts = await accountDb.getAccounts(sessionId.value)

  const users = await Promise.all(
    accounts.map(async (account) => {
      const user = await jsonPlaceholderApi.get(`/users/${account.id}`)
      return user.data
    }),
  )
  return NextResponse.json({ accounts: users }, { status: 200 })
}

export { GET }
