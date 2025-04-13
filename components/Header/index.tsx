'use client'

import { TextEffect } from 'components'
import { ArrowLeftIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'nextjs-toploader/app'
import { memo } from 'react'

interface Props {
  title: string
  description: string
}

function Header({ title, description }: Props): React.ReactElement {
  const { back, push } = useRouter()
  const pathname = usePathname()

  return (
    <header className="mb-8 flex items-center justify-between gap-5">
      <div className="flex flex-col">
        <h1 className="text-black font-medium dark:text-white">{title}</h1>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          {description}
        </TextEffect>
      </div>
      <AnimatePresence>
        {pathname !== '/' && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              const currentDomain = window.location.hostname
              const referrerDomain = document.referrer
                ? new URL(document.referrer).hostname
                : ''

              if (!referrerDomain || referrerDomain !== currentDomain) {
                push('/')
              } else {
                back()
              }
            }}
          >
            <ArrowLeftIcon
              size={24}
              className="hover:-translate-x-1 duration-150 text-zinc-600 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </header>
  )
}

export default memo(Header)
