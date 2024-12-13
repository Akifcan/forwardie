import { NextRequest, NextResponse } from 'next/server'

async function POST(req: NextRequest) {
  const data = await req.json()
  console.log(data)
  return NextResponse.json({ text: 'Thank you for your message.' }, { status: 201 })
}

export { POST }
