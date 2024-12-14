import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import appApi from './http/app.api'

async function roleGuard(pathname: string, url: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (pathname.includes('posts')) {
    const response = await appApi.post<{ access: boolean }>(
      `${url}/api/roles`,
      { role: 'view-post' },
      {
        headers: {
          Authorization: token?.value,
        },
      },
    )
    return response.data.access
  }

  if (pathname.includes('albums')) {
    const response = await appApi.post<{ access: boolean }>(
      `${url}/api/roles`,
      { role: 'view-album' },
      {
        headers: {
          Authorization: token?.value,
        },
      },
    )
    return response.data.access
  }

  return true
}

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  const hasRole = await roleGuard(request.nextUrl.pathname, request.nextUrl.origin)

  if (!hasRole) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - auth route
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
