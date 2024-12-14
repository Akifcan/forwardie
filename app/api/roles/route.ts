import roleSchema from '@/schemas/role.schema'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import rolesDb from '../db/sessions/roles.db'
import { UserProps } from '../auth/auth.types'

async function POST(req: NextRequest) {
  try {
    const data = await roleSchema.validate(await req.json())
    const token = req.headers.get('authorization')
    if (!token) {
      return NextResponse.json({ status: 'danger', message: 'Not found token' }, { status: 401 })
    }
    const decoded = jwt.verify(token, process.env.AUTH_SECRET!) as UserProps
    const role = data.role
    const hasAccess = await rolesDb.hasRole(decoded.id, role)
    return NextResponse.json({ access: hasAccess }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ status: 'danger', message: (e as Record<string, string>).message || 'Unexcepted error occured please try again' }, { status: 500 })
  }
}

export { POST }
