import type { Metadata } from 'next'
import './globals.css'
import UiProvider from '@/providers/ui.provider'

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
    <html lang="en">
      <body>
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  )
}
