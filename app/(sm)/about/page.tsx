import type { Metadata } from 'next'

import Client from './client'

export const metadata: Metadata = {
  title: 'About'
}

export default function Page(): React.ReactElement {
  return <Client />
}
