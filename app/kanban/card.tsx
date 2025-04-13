'use client'

interface Props {
  name: string
  index: number
}

export default function Card({ name, index }: Props): React.ReactElement {
  return (
    <li>
      <div className="rounded-lg cursor-pointer bg-zinc-100 dark:bg-zinc-800">
        <div className="py-1.5 px-2">name</div>
      </div>
    </li>
  )
}
