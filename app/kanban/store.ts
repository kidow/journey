import { create } from 'zustand'

type Card = string
interface Item {
  id: string
  title: string
  cardList: Card[]
}

interface KanbanStore {
  list: Item[]
  setList: (list: Item[]) => void
}

export const useKanbanStore = create<KanbanStore>((set) => ({
  list: [],
  setList: (list) => set({ list })
}))
