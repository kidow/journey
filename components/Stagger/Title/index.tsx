import { memo } from 'react'

interface Props {
  name: string
}

function StaggerTitle({ name }: Props): React.ReactElement {
  return <h3 className="mb-3 text-lg font-medium">{name}</h3>
}

export default memo(StaggerTitle)
