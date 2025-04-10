'use client'

import { Icon, MorphingPopover } from 'components'
import { motion } from 'motion/react'

export default function Spotify(): React.ReactElement {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2">
      <MorphingPopover>
        <MorphingPopover.Trigger asChild>
          <motion.button
            layoutId="morphing-popover-basic-label"
            layout="position"
          >
            <Icon.Spotify className="w-6 h-6" />
          </motion.button>
        </MorphingPopover.Trigger>
        <MorphingPopover.Content className="p-0 w-150">
          <iframe
            className="rounded-lg"
            src="https://open.spotify.com/embed/playlist/1SQNwBHKe8bk7VDLX6HOdK?utm_source=generator"
            width="100%"
            height="152"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </MorphingPopover.Content>
      </MorphingPopover>
    </div>
  )
}
