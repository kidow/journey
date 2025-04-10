import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Geist_Mono } from 'next/font/google'
import { cn } from 'services'

import './globals.css'
import Theme from './theme'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff'
}

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
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'bg-white tracking-tight antialiased dark:bg-zinc-950'
        )}
      >
        <ThemeProvider
          enableSystem
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          {children}
          <Theme />
        </ThemeProvider>
      </body>
    </html>
  )
}
