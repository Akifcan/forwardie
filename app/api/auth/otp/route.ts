import { NextRequest, NextResponse } from 'next/server'

async function POST(req: NextRequest) {
  console.log(await req.json())
  return NextResponse.json({ status: 'asdf' }, { status: 200 })
}

export { POST }
