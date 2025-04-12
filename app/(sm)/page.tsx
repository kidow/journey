'use client'

import { Header, TextEffect } from 'components'
import { motion } from 'motion/react'
import type { Transition, Variants } from 'motion/react'
import Link from 'next/link'

import Spotify from './spotify'

const VARIANTS_SECTION: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
}

const TRANSITION_SECTION: Transition = {
  duration: 0.3
}

export default function Page(): React.ReactElement {
  return (
    <>
      <Header title="Dongwook Kim" description="Web Frontend Engineer" />

      {/* <Spotify /> */}

      <motion.main
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        className="space-y-24"
        initial="hidden"
        animate="visible"
      >
        <motion.section>
          <p className="text-zinc-600 dark:text-zinc-400">
            Committed to profitable outcomes, while simultaneously passionate
            about crafting beautiful UI.
          </p>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-3 text-lg font-medium">Projects</h3>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-3 text-lg font-medium">Toys</h3>
          <ul>
            <li>
              <Link href="/memo" className="underline dark:text-zinc-300">
                Memo
              </Link>
            </li>
          </ul>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-3 text-lg font-medium">Careers</h3>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-3 text-lg font-medium">Blog</h3>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-3 text-lg font-medium">Connect</h3>
          <p className="mb-5 text-zinc-600 dark:text-zinc-400">
            Feel free to contact me at{' '}
            <a
              className="underline dark:text-zinc-300"
              href="mailto:wcgo2ling@gmail.com"
            >
              wcgo2ling@gmail.com
            </a>
          </p>
        </motion.section>
      </motion.main>

      <footer className="mt-24 py-4 border-t border-zinc-100 dark:border-zinc-800">
        <span className="text-xs text-zinc-500">© 2025 Dongwook Kim</span>
      </footer>
    </>
  )
}
