import { Alert, Button, Skeleton } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function List({
  title,
  children,
  onPress,
  isLoading,
  isError,
  hasAccess,
}: Readonly<{ title: string; children: ReactNode; onPress?: () => void; isLoading: boolean; isError: boolean; hasAccess: boolean }>) {
  return hasAccess ? (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl">{title}</h3>
      {isError && <Alert color="danger" title="Fetching error occured" />}
      {!isLoading && !isError && children}
      {isLoading && (
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      )}
      {onPress && (
        <Button color="primary" onPress={onPress}>
          View All
        </Button>
      )}
    </div>
  ) : null
}
