'use client'

import { PencilIcon, PlusIcon, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useObjectState } from 'services'

import Card from './card'
import { useKanbanStore } from './store'

interface Props {
  index: number
  id: string
  title: string
  cardList: Array<{ name: string }>
  isEdit?: boolean
}
interface State {
  isAdd: boolean
}
interface Inputs {
  name: string
}

export default function Item({
  id,
  title,
  cardList,
  index,
  isEdit
}: Props): React.ReactElement {
  const [{ isAdd }, setState] = useObjectState<State>({
    isAdd: false
  })
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const { list, setList } = useKanbanStore()

  function onSubmit(data: Inputs) {
    setList([
      ...list.slice(0, index),
      { id, title, cardList: [...cardList, { name: data.name }] },
      ...list.slice(index + 1)
    ])
    setState({ isAdd: false })
    reset()
  }
  return (
    <div className="rounded-md overflow-hidden dark:bg-zinc-900 bg-zinc-100 w-68 shrink-0">
      <div className="py-1.5 px-2 flex items-center group">
        {isEdit ? (
          <input
            className="py-1 px-2 flex-1 rounded-md"
            autoFocus
            value={title}
            onChange={(e) =>
              setList([
                ...list.slice(0, index),
                {
                  ...list[index],
                  title: e.target.value
                },
                ...list.slice(index + 1)
              ])
            }
            onBlur={() =>
              setList([
                ...list.slice(0, index),
                {
                  ...list[index],
                  isEdit: false
                },
                ...list.slice(index + 1)
              ])
            }
          />
        ) : (
          <div
            className="py-1 px-2 flex-1 cursor-text"
            onClick={() =>
              setList([
                ...list.slice(0, index),
                {
                  ...list[index],
                  isEdit: true
                },
                ...list.slice(index + 1)
              ])
            }
          >
            {title}
          </div>
        )}
        {!isEdit && (
          <button
            onClick={() =>
              setList([
                ...list.slice(0, index),
                {
                  ...list[index],
                  isEdit: true
                },
                ...list.slice(index + 1)
              ])
            }
            className="invisible group-hover:visible"
          >
            <PencilIcon size={14} />
          </button>
        )}
      </div>
      <ul className="px-2 space-y-2 pb-2">
        {cardList.map((card, key) => (
          <Card name={card.name} index={key} key={key} />
        ))}
      </ul>
      {isAdd ? (
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 space-y-2">
          <textarea
            {...register('name', { required: true })}
            className="py-1 px-2 flex-1 rounded-md w-full"
            autoFocus
            rows={3}
            placeholder="Enter a title for this card..."
            onBlur={() => {
              setState({ isAdd: false })
              reset()
            }}
          />
          <div className="flex items-center gap-1">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-500 text-white"
            >
              Add card
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
        <button
          className="p-2 flex items-center w-full gap-0.5 dark:hover:bg-zinc-800 hover:bg-zinc-200 duration-150"
          aria-label="Add another card"
          onClick={() => setState({ isAdd: true })}
        >
          <PlusIcon size={20} />
          <span className="text-sm">Add another card</span>
        </button>
      )}
    </div>
  )
}
