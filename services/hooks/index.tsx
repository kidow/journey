'use client'

import { useSearchParams } from 'next/navigation'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
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
      setStoredValue(JSON.parse(item))
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

export function useObjectState<T>(
  initialState: T
): [
  T,
  (obj: Partial<T>, callback?: (state: T) => void) => void,
  (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void,
  (keys?: Array<keyof T>) => void
] {
  const [state, setState] = useState<T>(initialState)
  const callbackRef = useRef<(state: T) => void | null>(null)
  const isFirstCallbackCall = useRef<boolean>(true)

  const onChange = useCallback(
    (obj: Partial<T>, callback?: (state: T) => void) => {
      callbackRef.current = callback || null
      setState((prevState) => ({ ...prevState, ...obj }))
    },
    []
  )

  const onEventChange = useCallback(
    ({
      target: { name, value }
    }: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >): void => setState((prevState) => ({ ...prevState, [name]: value })),
    []
  )

  const arrayToObject = (keys: Array<keyof T>): T => {
    if (!keys.length) return initialState
    const initial: any = {}
    keys.reduce((acc, cur) => (initial[cur] = initialState[cur]), initial)
    return initial
  }
  const resetState = (keys?: Array<keyof T>) =>
    keys
      ? setState((prevState) => ({ ...prevState, ...arrayToObject(keys) }))
      : setState({ ...initialState })

  useEffect(() => {
    if (isFirstCallbackCall.current) {
      isFirstCallbackCall.current = false
      return
    }
    callbackRef.current?.(state)
  }, [state])

  return [state, onChange, onEventChange, resetState]
}
