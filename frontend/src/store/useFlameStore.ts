import { create } from "zustand"

interface FlameState {
  // Shape parameters (typically 10-100 dimensions, using 10 for demo)
  shape: number[]
  // Expression parameters (typically 50-100 dimensions, using 10 for demo)
  expression: number[]
  
  // Actions
  setShape: (index: number, value: number) => void
  setExpression: (index: number, value: number) => void
  resetParameters: () => void
}

export const useFlameStore = create<FlameState>((set) => ({
  shape: new Array(10).fill(0),
  expression: new Array(10).fill(0),

  setShape: (index, value) => 
    set((state) => {
      const newShape = [...state.shape]
      newShape[index] = value
      return { shape: newShape }
    }),

  setExpression: (index, value) => 
    set((state) => {
      const newExpression = [...state.expression]
      newExpression[index] = value
      return { expression: newExpression }
    }),

  resetParameters: () => 
    set({
      shape: new Array(10).fill(0),
      expression: new Array(10).fill(0),
    }),
}))
