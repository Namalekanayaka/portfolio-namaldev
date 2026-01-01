import { useRef } from 'react'
import { Float, Cylinder, MeshReflectorMaterial, SoftShadows } from '@react-three/drei'
import { Suspense } from 'react'
import { Avatar as ProceduralAvatar } from './3d/Avatar'
import { Avatar as RealAvatar } from './3d/RealAvatar'
import ErrorBoundary from './ErrorBoundary'

function CharacterWrapper() {
    return (
        <ErrorBoundary fallback={<ProceduralAvatar scale={2} position={[0, -1, 0]} />}>
            <Suspense fallback={<ProceduralAvatar scale={2} position={[0, -1, 0]} />}>
                <RealAvatar scale={1.8} position={[0, -1, 0]} rotation={[0, 0, 0]} />
            </Suspense>
        </ErrorBoundary>
    )
}

export default function HeroStage({ isMobile }) {
    return (
        <group position={[0, -1.5, 0]}>
            {/* Cinematic Lighting Setup is in Experience.jsx, but we add local rim lights/glows here if needed */}

            {/* THE CHARACTER (Centerpiece) */}
            <group position={[0, 0, 0]}>
                <CharacterWrapper />
            </group>

            {/* PODIUM / FLOOR - Hidden on Mobile to remove "Ash Background" */}
            {!isMobile && (
                <group position={[0, -1.05, 0]}>
                    <Cylinder args={[3, 3, 0.1, 64]} receiveShadow>
                        <MeshReflectorMaterial
                            blur={[300, 100]}
                            resolution={1024}
                            mixBlur={1}
                            mixStrength={40}
                            roughness={0.5} // slightly glossy
                            depthScale={1.2}
                            minDepthThreshold={0.4}
                            maxDepthThreshold={1.4}
                            color="#101010"
                            metalness={0.5}
                        />
                    </Cylinder>
                </group>
            )}
        </group>
    )
}
