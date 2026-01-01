import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, PerformanceMonitor } from '@react-three/drei'
import { Suspense, useState } from 'react'
import Experience from './components/Experience'
import Overlay from './components/Overlay'

function App() {
  const [dpr, setDpr] = useState([1, 1.5]) // Default to range for performance

  return (
    <>
      <Canvas
        shadows={false} // Disable dynamic shadows for performance (we use baked/contact shadows)
        camera={{ position: [0, 2, 10], fov: 30 }}
        style={{ height: '100vh', width: '100vw' }}
        dpr={dpr} // Dynamic resolution scaling
        gl={{ preserveDrawingBuffer: true, antialias: false }} // Disable default AA if we use post-processing
      >
        <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} />

        <color attach="background" args={['#050505']} />

        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.3}>
            <Experience />

            <Scroll html style={{ width: '100%', height: '100%' }}>
              <Overlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
