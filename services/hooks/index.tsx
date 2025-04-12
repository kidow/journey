'use client'

import { useSearchParams } from 'next/navigation'
import { RefObject, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, handler])
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(initialValue)
  const searchParams = useSearchParams()

  useEffect(() => {
    const c = searchParams.get('c')
    const item = window.localStorage.getItem(key)
    if (c) {
      const content = JSON.parse(decodeURIComponent(atob(c)))
      setStoredValue(content)
    } else if (!!item) {
      console.log('item', item)
      //   setStoredValue(JSON.parse(item))
    }
  }, [key, searchParams])

  const setValue = (value: T) => {
    setStoredValue(value)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }
  return [storedValue, setValue]
}

export function useCopyToClipboard() {
  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      toast.success('Successfully copied.')
      return true
    } catch (_error) {
      toast.error('Failed to copy.')
      return false
    }
  }, [])

  return copy
}
