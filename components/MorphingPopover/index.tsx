'use client'

import {
  AnimatePresence,
  MotionConfig,
  Transition,
  Variants,
  motion
} from 'motion/react'
import {
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useRef,
  useState
} from 'react'
import { cn, useClickOutside } from 'services'

const TRANSITION = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.4
}

type ContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
  uniqueId: string
  variants?: Variants
}

const Context = createContext<ContextValue | null>(null)

function usePopoverLogic({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange
}: {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
} = {}) {
  const uniqueId = useId()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)

  const isOpen = controlledOpen ?? uncontrolledOpen

  const open = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(true)
    }
    onOpenChange?.(true)
  }

  const close = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(false)
    }
    onOpenChange?.(false)
  }

  return { isOpen, open, close, uniqueId }
}

type Props = {
  children: React.ReactNode
  transition?: Transition
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variants?: Variants
  className?: string
} & React.ComponentProps<'div'>

function MorphingPopover({
  children,
  transition = TRANSITION,
  defaultOpen,
  open,
  onOpenChange,
  variants,
  className,
  ...props
}: Props) {
  const popoverLogic = usePopoverLogic({ defaultOpen, open, onOpenChange })

  return (
    <Context.Provider value={{ ...popoverLogic, variants }}>
      <MotionConfig transition={transition}>
        <div
          className={cn('relative flex items-center justify-center', className)}
          key={popoverLogic.uniqueId}
          {...props}
        >
          {children}
        </div>
      </MotionConfig>
    </Context.Provider>
  )
}

type TriggerProps = {
  asChild?: boolean
  children: React.ReactNode
  className?: string
} & React.ComponentProps<typeof motion.button>

function Trigger({
  children,
  className,
  asChild = false,
  ...props
}: TriggerProps) {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Trigger must be used within MorphingPopover')
  }

  if (asChild && isValidElement(children)) {
    const MotionComponent = motion.create(
      children.type as React.ForwardRefExoticComponent<any>
    )
    const childProps = children.props as Record<string, unknown>

    return (
      <MotionComponent
        {...childProps}
        onClick={context.open}
        layoutId={`popover-trigger-${context.uniqueId}`}
        className={childProps.className}
        key={context.uniqueId}
        aria-expanded={context.isOpen}
        aria-controls={`popover-content-${context.uniqueId}`}
      />
    )
  }

  return (
    <motion.div
      key={context.uniqueId}
      layoutId={`popover-trigger-${context.uniqueId}`}
      onClick={context.open}
    >
      <motion.button
        {...props}
        layoutId={`popover-label-${context.uniqueId}`}
        key={context.uniqueId}
        className={className}
        aria-expanded={context.isOpen}
        aria-controls={`popover-content-${context.uniqueId}`}
      >
        {children}
      </motion.button>
    </motion.div>
  )
}

type ContentProps = {
  children: React.ReactNode
  className?: string
} & React.ComponentProps<typeof motion.div>

function Content({ children, className, ...props }: ContentProps) {
  const context = useContext(Context)
  if (!context) throw new Error('Content must be used within MorphingPopover')

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, context.close)

  useEffect(() => {
    if (!context.isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') context.close()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [context.isOpen, context.close])

  return (
    <AnimatePresence>
      {context.isOpen && (
        <>
          <motion.div
            {...props}
            ref={ref}
            layoutId={`popover-trigger-${context.uniqueId}`}
            key={context.uniqueId}
            id={`popover-content-${context.uniqueId}`}
            role="dialog"
            aria-modal="true"
            className={cn(
              'absolute overflow-hidden rounded-md border border-zinc-950/10 bg-white p-2 text-zinc-950 shadow-md dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50',
              className
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={context.variants}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Object.assign(MorphingPopover, { Trigger, Content })
