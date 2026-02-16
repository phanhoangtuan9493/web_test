import { cn } from '@/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <div
      data-slot="skeleton"
      data-testid={testId}
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
