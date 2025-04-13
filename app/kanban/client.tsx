'use client'

import { Header } from 'components'
import { PlusIcon } from 'lucide-react'
import { useEffect } from 'react'
import { randomString } from 'services'

import Item from './item'
import { useKanbanStore } from './store'

export default function Client(): React.ReactElement {
  const { list, setList } = useKanbanStore()

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
          <div
            onClick={() =>
              setList([
                ...list,
                { id: randomString(), title: '', cardList: [] }
              ])
            }
            className="p-3 cursor-pointer w-68 flex items-center gap-1.5 rounded-xl duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <PlusIcon size={20} />
            <span className="text-sm">Add another list</span>
          </div>
        </div>
      </div>
    </main>
  )
}
