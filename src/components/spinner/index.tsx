import { Loader } from 'lucide-react'

import { cn } from '@/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      style={{ animationDuration: '2s' }}
      {...props}
    />
  )
}

export { Spinner }
