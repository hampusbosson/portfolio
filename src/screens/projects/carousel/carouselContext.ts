import { createContext, type Dispatch, type SetStateAction } from "react"

export interface CarouselSettings {
  width: number
  height: number
  rotation: [number, number, number]
  position: [number, number, number]
  itemGap: number
  enableParallax: boolean
  enableFloating: boolean
}

export interface CarouselContextType {
  activeIndex: number | null
  setActiveIndex: Dispatch<SetStateAction<number | null>>
  settings: CarouselSettings
  isActive: boolean
  toggleParallax: () => void
  toggleFloating: () => void
}

export const CarouselContext = createContext<CarouselContextType | null>(null)
