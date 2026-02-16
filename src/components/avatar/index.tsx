'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/utils'

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-testid={testId}
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      data-testid={testId}
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      data-testid={testId}
      className={cn('bg-muted flex size-full items-center justify-center rounded-full', className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
