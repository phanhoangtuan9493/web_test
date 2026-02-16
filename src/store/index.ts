import { create } from 'zustand'
import type { Order } from '@/types'

interface OrderState {
  order: Order | undefined
}

const initialState: OrderState = {
  order: undefined,
}

interface OrderAction {
  setOrder: (order: Order) => void
}

export const useOrderStore = create<OrderState & OrderAction>((set) => ({
  ...initialState,
  setOrder: (order: Order) => set({ order }),
}))