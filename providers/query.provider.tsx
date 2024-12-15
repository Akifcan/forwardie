'use client'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const queryClient = new QueryClient()

export default function QueryProvider({ children }: Readonly<{ children: ReactNode }>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
