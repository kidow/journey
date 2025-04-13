import { create } from 'zustand'

interface Item {
  id: string
  title: string
  cardList: Array<{ name: string }>
  isEdit?: boolean
}

interface KanbanStore {
  list: Item[]
  setList: (list: Item[]) => void
}

export const useKanbanStore = create<KanbanStore>((set) => ({
  list: [],
  setList: (list) => set({ list })
}))
