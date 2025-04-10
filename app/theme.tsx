'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Theme(): React.ReactElement {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-md p-2 fixed top-2 right-2"
      aria-label="Change theme"
    >
      {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}
