import { motion } from 'motion/react'

import StaggerSection from './Section'
import StaggerTitle from './Title'

function Stagger({ children }: ReactProps): React.ReactElement {
  return (
    <motion.main
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
      }}
      className="space-y-24"
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.main>
  )
}

export default Object.assign(Stagger, {
  Section: StaggerSection,
  Title: StaggerTitle
})
