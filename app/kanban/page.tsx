import type { Metadata } from 'next'

import Client from './client'

export const metadata: Metadata = {
  title: 'Kanban',
  description: 'All work is stored in local storage.'
}

export default async function Page(): Promise<React.ReactElement> {
  return <Client />
}
