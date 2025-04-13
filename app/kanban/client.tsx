'use client'

import { Header } from 'components'
import { PlusIcon, XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { randomString, useObjectState } from 'services'

import Item from './item'
import { useKanbanStore } from './store'

interface State {
  isAdd: boolean
}
interface Inputs {
  title: string
}

export default function Client(): React.ReactElement {
  const [{ isAdd }, setState] = useObjectState<State>({
    isAdd: false
  })
  const { list, setList } = useKanbanStore()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  function onSubmit(data: Inputs) {
    setList([...list, { id: randomString(), title: data.title, cardList: [] }])
    setState({ isAdd: false })
    reset()
  }

  useEffect(() => {
    const kanban = window.localStorage.getItem('kanban')
    setList(
      kanban
        ? JSON.parse(kanban)
        : [
            { id: randomString(), title: 'Todo', cardList: [] },
            { id: randomString(), title: 'In Progress', cardList: [] },
            { id: randomString(), title: 'Done', cardList: [] }
          ]
    )
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
        <div className="inline-flex items-start mx-5 space-x-2">
          {list.map((item, key) => (
            <Item
              key={key}
              id={item.id}
              title={item.title}
              cardList={item.cardList}
              index={key}
              isEdit={item.isEdit}
            />
          ))}
          {isAdd ? (
            <form
              className="rounded-md p-3 dark:bg-zinc-900 bg-zinc-100 w-68 space-y-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register('title', { required: true })}
                type="text"
                className="py-1 px-2 w-full rounded-md"
                autoFocus
                onBlur={() => {
                  setState({ isAdd: false })
                  reset()
                }}
                placeholder="Enter list name..."
              />
              <div className="flex items-center gap-1">
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-blue-500 text-white"
                >
                  Add list
                </button>
                <button
                  type="button"
                  className="p-2 rounded-md"
                  onClick={() => setState({ isAdd: false })}
                >
                  <XIcon size={20} />
                </button>
              </div>
            </form>
          ) : (
            <div
              onClick={() => setState({ isAdd: true })}
              className="p-3 cursor-pointer w-68 flex items-center gap-1.5 rounded-xl duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <PlusIcon size={20} />
              <span className="text-sm">Add another list</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
