'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function UiProvider({ children }: Readonly<{ children: ReactNode }>) {
  return <NextUIProvider>{children}</NextUIProvider>
}
