'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const testId = (props as Record<string, unknown>)['data-testid']
  return <CollapsiblePrimitive.Root data-slot="collapsible" data-testid={testId} {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  const testId = (props as Record<string, unknown>)['data-testid']
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      data-testid={testId}
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  const testId = (props as Record<string, unknown>)['data-testid']
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      data-testid={testId}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
