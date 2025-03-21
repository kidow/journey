import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cn } from 'services'

import Spotify from './_spotify'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Kidow',
  description: 'Web Front-end Engineer'
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        {children}
        {/* <Spotify /> */}
      </body>
    </html>
  )
}
