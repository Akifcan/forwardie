import type { Metadata } from 'next'
import Providers from '@/providers/base.provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forwardie',
  description: 'App',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
