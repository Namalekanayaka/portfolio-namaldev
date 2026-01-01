import React from 'react';
import { Avatar as ProceduralAvatar } from './3d/Avatar'
import { Room } from './3d/Room'
import { Bed } from './3d/Bed'
import { Desk } from './3d/Desk'
import { Float, Text } from '@react-three/drei'

// A fallback HeroStage that uses ONLY procedural components
// We use this if the 'RealAvatar' crashes due to missing file.
export default function HeroStageFallback() {
    return (
        <group position={[0, -2.5, 0]}>
            {/* Simple Message */}
            <Text position={[0, 2, 0]} fontSize={0.5} color="red">
                Model Not Found via Code - Falling Back
            </Text>
            <Room />
            <group position={[3, 0, -4]} rotation={[0, -Math.PI / 3, 0]}>
                <Desk position={[0, 0, 0]} />
                <group position={[0, 1.2, 1.5]} rotation={[0, Math.PI, 0]}>
                    <Float speed={2} rotationIntensity={0.05} floatIntensity={0.05}>
                        <ProceduralAvatar scale={1.1} />
                    </Float>
                </group>
            </group>
            <Bed position={[-3, 0, -3]} rotation={[0, 0, 0]} scale={0.8} />
        </group>
    )
}
