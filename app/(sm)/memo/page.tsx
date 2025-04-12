import type { Metadata } from 'next'
import { Suspense } from 'react'

import Client from './client'

export const metadata: Metadata = {
  title: 'Memo'
}

export default async function Page(): Promise<React.ReactElement> {
  return (
    <Suspense fallback={null}>
      <Client />
    </Suspense>
  )
}
