import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Geist_Mono } from 'next/font/google'
import { cn } from 'services'

import './globals.css'
import Theme from './theme'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Dongwook Kim',
    default: 'Dongwook Kim'
  },
  description: 'Web Frontend Engineer'
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Theme />
        </ThemeProvider>
      </body>
    </html>
  )
}
