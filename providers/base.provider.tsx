'use client'
import { ReactNode } from 'react'
import QueryProvider from './query.provider'
import UiProvider from './ui.provider'

export default function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <QueryProvider>
      <UiProvider>{children}</UiProvider>
    </QueryProvider>
  )
}
