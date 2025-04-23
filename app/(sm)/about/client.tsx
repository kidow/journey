'use client'

import { Header, Stagger } from 'components'
import { motion } from 'motion/react'

export default function Client(): React.ReactElement {
  return (
    <>
      <Header title="About" description="Hi. I'm Dongwook Kim." />

      <Stagger>
        <motion.section>
          <p className="text-zinc-600 dark:text-zinc-400">
            I lived in South Korea and started developing web in 2018.
          </p>
        </motion.section>

        <Stagger.Section>
          <Stagger.Title name="Now" />
          <p className="text-zinc-600 dark:text-zinc-400">asd</p>
        </Stagger.Section>
      </Stagger>
    </>
  )
}
