import { motion } from 'motion/react'

function StaggerSection({ children }: ReactProps): React.ReactElement {
  return (
    <motion.section
      variants={{
        hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
      }}
      transition={{
        duration: 0.3
      }}
    >
      {children}
    </motion.section>
  )
}

export default StaggerSection
