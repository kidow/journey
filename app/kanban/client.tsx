'use client'

import { Header } from 'components'
import { useEffect } from 'react'

export default function Client(): React.ReactElement {
  useEffect(() => {
    document.body.classList.add('overflow-x-auto')
    return () => {
      document.body.classList.remove('overflow-x-auto')
    }
  }, [])
  return (
    <main className="flex flex-col h-screen">
      <div className="fixed top-0 h-30 pt-20 px-4 z-10 w-full left-0 right-0">
        <div className="w-full max-w-screen-sm mx-auto">
          <Header
            title="Kanban"
            description="All work is stored in local storage."
          />
        </div>
      </div>
      <div className="flex-1 mt-50 overflow-x-auto sm:overflow-x-visible">
        <div className="inline-flex mx-5 space-x-2">
          {Array.from({ length: 10 }).map((_, key) => (
            <div
              key={key}
              className="rounded dark:bg-zinc-900 bg-zinc-100 w-68 shrink-0"
            >
              <div className="pt-1.5 pr-9 pb-1 pl-2">asd</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
