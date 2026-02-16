import * as React from 'react'

import { cn } from '@/utils'
import { useEffect, useRef } from 'react'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }) => {
    const testId = (props as Record<string, unknown>)['data-testid']

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Auto-resize textarea based on content
    useEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        if (typeof props.value === 'string' && props.value.trim() === '') {
          textarea.style.height = '48px'
        } else {
          textarea.style.height = `${textarea.scrollHeight}px`
        }
      }
    }, [props.value])

    return (
      <textarea
        ref={textareaRef}
        data-slot="textarea"
        data-testid={testId}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
