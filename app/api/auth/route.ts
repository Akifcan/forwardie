import { NextRequest, NextResponse } from 'next/server'

async function POST(req: NextRequest) {
  const data = await req.json()
  console.log(data)
  const OTP = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
  return NextResponse.json({ status: 'success', message: `Please check your mailbox for OTP Code - ${OTP}` }, { status: 200 })
}

export { POST }
