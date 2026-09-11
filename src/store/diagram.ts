import { create } from 'zustand'

export type DiagramKey = 'tally' | 'fylflix'

/**
 * Which architecture diagram is open. Lives outside the Architecture section
 * so a case study can select its own diagram and then scroll to it.
 */
export const useDiagram = create<{ key: DiagramKey; open: (k: DiagramKey) => void }>((set) => ({
  key: 'tally',
  open: (key) => set({ key }),
}))
