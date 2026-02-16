import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Canvas } from '@react-three/fiber'
//import { KeyboardControls } from '@react-three/drei'
import Experience from './Experience.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Canvas>
      <Experience />
    </Canvas>
  </StrictMode>,
)
