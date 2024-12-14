import { ReactNode } from 'react'

export default function List({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl">{title}</h3>
      {children}
    </div>
  )
}
