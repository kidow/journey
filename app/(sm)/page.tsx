'use client'

import { Disclosure, Header } from 'components'
import { motion } from 'motion/react'
import type { Transition, Variants } from 'motion/react'
import Link from 'next/link'

import Spotify from './spotify'

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
}

const TRANSITION: Transition = {
  duration: 0.3
}

const CAREERS: Array<{
  title: string
  company: string
  period: string
  description: string
}> = [
  {
    title: 'Frontend Engineer',
    company: 'Toodle',
    period: '2024.01 - Present',
    description: 'content'
  },
  {
    title: 'Frontend Leader',
    company: 'Fetching',
    period: '2021.09 - 2022.08',
    description: 'content'
  },
  {
    title: 'Frontend Engineer',
    company: 'Insunet',
    period: '2019.09 - 2020.10',
    description: 'content'
  }
]

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

        <motion.section variants={VARIANTS} transition={TRANSITION}>
          <h3 className="mb-3 text-lg font-medium">Projects</h3>
        </motion.section>

        <motion.section variants={VARIANTS} transition={TRANSITION}>
          <h3 className="mb-3 text-lg font-medium">Toys</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/memo" className="underline dark:text-zinc-300">
                Memo
              </Link>
            </li>
            <li>
              <Link href="/kanban" className="underline dark:text-zinc-300">
                Kanban
              </Link>
            </li>
          </ul>
        </motion.section>

        <motion.section variants={VARIANTS} transition={TRANSITION}>
          <h3 className="mb-3 text-lg font-medium">Games</h3>
        </motion.section>

        <motion.section variants={VARIANTS} transition={TRANSITION}>
          <h3 className="mb-3 text-lg font-medium">Careers</h3>
          <div className="space-y-2">
            {CAREERS.map((item, key) => (
              <Disclosure
                key={key}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-4"
              >
                <Disclosure.Trigger>
                  <button className="w-full flex text-left justify-between">
                    <div>
                      <h4 className="dark:text-zinc-100">{item.title}</h4>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {item.company}
                      </p>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {item.period}
                    </p>
                  </button>
                </Disclosure.Trigger>
                <Disclosure.Content>
                  <div className="pt-4">{item.description}</div>
                </Disclosure.Content>
              </Disclosure>
            ))}
          </div>
        </motion.section>

        <motion.section variants={VARIANTS} transition={TRANSITION}>
          <h3 className="mb-3 text-lg font-medium">Blog</h3>
        </motion.section>

        <motion.section variants={VARIANTS} transition={TRANSITION}>
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
