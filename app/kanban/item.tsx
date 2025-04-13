'use client'

import { PlusIcon } from 'lucide-react'
import { randomString, useObjectState } from 'services'

import Card from './card'
import { useKanbanStore } from './store'

interface Props {
  index: number
  id: string
  title: string
  cardList: string[]
}
interface State {
  isEdit: boolean
}

export default function Item({
  id,
  title,
  cardList,
  index
}: Props): React.ReactElement {
  const [{ isEdit }, setState] = useObjectState<State>({
    isEdit: true
  })
  const { list, setList } = useKanbanStore()
  return (
    <div className="rounded-md overflow-hidden dark:bg-zinc-900 bg-zinc-100 w-68 shrink-0">
      <div className="pt-1.5 pr-9 pb-1 pl-2">
        <div className="py-1 px-2">{title}</div>
      </div>
      <ul className="px-2 space-y-2 pb-2">
        {cardList.map((card, key) => (
          <Card name={card} index={key} key={key} />
        ))}
      </ul>
      <button
        className="p-2 flex items-center w-full gap-0.5 dark:hover:bg-zinc-800 hover:bg-zinc-200 duration-150"
        aria-label="Add another card"
        onClick={() =>
          setList([
            ...list.slice(0, index),
            { id, title, cardList: [...cardList, ''] },
            ...list.slice(index + 1)
          ])
        }
      >
        <PlusIcon size={20} />
        <span className="text-sm">Add another card</span>
      </button>
    </div>
  )
}
