'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/utils'
import { buttonVariants } from '@/components/button/button-variants'

function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  const testId = (props as Record<string, unknown>)['data-testid']
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" data-testid={testId} {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  const testId = (props as Record<string, unknown>)['data-testid']
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      data-testid={testId}
      {...props}
    />
  )
}

function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  const testId = (props as Record<string, unknown>)['data-testid']
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" data-testid={testId} {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      data-testid={testId}
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-testid={testId}
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <div
      data-slot="alert-dialog-header"
      data-testid={testId}
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <div
      data-slot="alert-dialog-footer"
      data-testid={testId}
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      data-testid={testId}
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      data-testid={testId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <AlertDialogPrimitive.Action
      data-testid={testId}
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  const testId = (props as Record<string, unknown>)['data-testid']

  return (
    <AlertDialogPrimitive.Cancel
      data-testid={testId}
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
