import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Cylinder, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export function Avatar(props) {
    const group = useRef()
    const head = useRef()
    const spine = useRef()
    const leftArm = useRef()
    const rightArm = useRef()

    // Materials reuse for performance
    const materials = useMemo(() => ({
        skin: new THREE.MeshStandardMaterial({ color: "#eebb99", roughness: 0.4 }),
        hair: new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.9 }),
        shirt: new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.6 }), // White Tee
        pants: new THREE.MeshStandardMaterial({ color: "#2d3748", roughness: 0.7 }), // Dark Jeans
        shoes: new THREE.MeshStandardMaterial({ color: "#111", roughness: 0.5 }),
        chair: new THREE.MeshStandardMaterial({ color: "#4a5568" })
    }), [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // Organic Breathing (Spine Scale & Y-Position)
        const breath = Math.sin(t * 1.5)
        if (spine.current) {
            spine.current.position.y = 0.85 + breath * 0.005
            spine.current.rotation.x = 0.1 + breath * 0.02 // Slight forward lean breathing
        }

        // Head Micro-movements (Looking at screen, then slight drift)
        if (head.current) {
            head.current.rotation.y = Math.sin(t * 0.5) * 0.15
            head.current.rotation.x = Math.cos(t * 0.3) * 0.05
        }

        // Arms subtle jitter (Simulating key presses / mouse movement)
        if (rightArm.current) {
            rightArm.current.rotation.x = -0.5 + Math.sin(t * 10) * 0.02
        }
    })

    return (
        <group ref={group} {...props} dispose={null}>

            {/* --- SPINE / TORSO GROUP --- */}
            <group ref={spine} position={[0, 0.85, 0]}>

                {/* Upper Body (Shirt) */}
                <RoundedBox args={[0.48, 0.65, 0.28]} radius={0.05} position={[0, 0, 0]}>
                    <primitive object={materials.shirt} />
                </RoundedBox>

                {/* NECK */}
                <Cylinder args={[0.06, 0.06, 0.2]} position={[0, 0.35, 0]}>
                    <primitive object={materials.skin} />
                </Cylinder>

                {/* --- HEAD GROUP --- */}
                <group ref={head} position={[0, 0.52, 0]}>
                    {/* Face Shape - More Defined */}
                    <RoundedBox args={[0.26, 0.32, 0.28]} radius={0.12} position={[0, 0, 0]}>
                        <primitive object={materials.skin} />
                    </RoundedBox>

                    {/* Nose */}
                    <Box args={[0.04, 0.08, 0.04]} position={[0, -0.02, 0.16]} rotation={[-0.2, 0, 0]}>
                        <meshStandardMaterial color="#eebb99" />
                    </Box>

                    {/* Ears */}
                    <RoundedBox args={[0.08, 0.12, 0.05]} radius={0.02} position={[-0.14, 0, 0]}>
                        <primitive object={materials.skin} />
                    </RoundedBox>
                    <RoundedBox args={[0.08, 0.12, 0.05]} radius={0.02} position={[0.14, 0, 0]}>
                        <primitive object={materials.skin} />
                    </RoundedBox>

                    {/* Hair - Layered for volume */}
                    <group position={[0, 0.08, 0]}>
                        <RoundedBox args={[0.28, 0.15, 0.3]} radius={0.1} position={[0, 0.1, -0.02]}>
                            <primitive object={materials.hair} />
                        </RoundedBox>
                        <RoundedBox args={[0.3, 0.1, 0.28]} radius={0.05} position={[0, 0.05, 0]}>
                            <primitive object={materials.hair} />
                        </RoundedBox>
                        {/* Bangs / Front Hair */}
                        <Box args={[0.26, 0.08, 0.05]} position={[0, 0.12, 0.14]} rotation={[0.2, 0, 0]}>
                            <primitive object={materials.hair} />
                        </Box>
                    </group>

                    {/* Glasses - Thin frames */}
                    <group position={[0, 0.02, 0.15]}>
                        <Box args={[0.11, 0.07, 0.01]} position={[-0.07, 0, 0]}><meshStandardMaterial color="#333" transparent opacity={0.3} /></Box>
                        <Box args={[0.11, 0.07, 0.01]} position={[0.07, 0, 0]}><meshStandardMaterial color="#333" transparent opacity={0.3} /></Box>
                        <Box args={[0.26, 0.02, 0.01]} position={[0, 0.04, 0]}><meshStandardMaterial color="#111" /></Box> {/* Top rim */}
                    </group>
                </group>

                {/* --- ARMS --- */}
                {/* Left Arm (Keyboard Hand) */}
                <group ref={leftArm} position={[-0.32, 0.2, 0]} rotation={[0.8, 0.5, -0.2]}>
                    {/* Shoulder/Sleeve */}
                    <Sphere args={[0.11]} position={[0, 0, 0]}><primitive object={materials.shirt} /></Sphere>
                    {/* Upper Arm */}
                    <Cylinder args={[0.09, 0.08, 0.35]} position={[0, -0.15, 0]}>
                        <primitive object={materials.skin} />
                    </Cylinder>
                    {/* Elbow */}
                    <Sphere args={[0.08]} position={[0, -0.32, 0]}><primitive object={materials.skin} /></Sphere>
                    {/* Forearm (Bent forward to desk) */}
                    <group position={[0, -0.32, 0]} rotation={[-1.8, 0, 0]}>
                        <Cylinder args={[0.07, 0.06, 0.3]} position={[0, -0.15, 0]}><primitive object={materials.skin} /></Cylinder>
                        {/* Hand */}
                        <RoundedBox args={[0.1, 0.12, 0.05]} radius={0.02} position={[0, -0.32, 0]}>
                            <primitive object={materials.skin} />
                        </RoundedBox>
                    </group>
                </group>

                {/* Right Arm (Mouse Hand) */}
                <group ref={rightArm} position={[0.32, 0.2, 0]} rotation={[0.6, -0.5, 0.2]}>
                    <Sphere args={[0.11]} position={[0, 0, 0]}><primitive object={materials.shirt} /></Sphere>
                    <Cylinder args={[0.09, 0.08, 0.35]} position={[0, -0.15, 0]}><primitive object={materials.skin} /></Cylinder>
                    <Sphere args={[0.08]} position={[0, -0.32, 0]}><primitive object={materials.skin} /></Sphere>
                    <group position={[0, -0.32, 0]} rotation={[-1.5, 0, 0]}>
                        <Cylinder args={[0.07, 0.06, 0.3]} position={[0, -0.15, 0]}><primitive object={materials.skin} /></Cylinder>
                        <RoundedBox args={[0.1, 0.12, 0.05]} radius={0.02} position={[0, -0.32, 0]}>
                            <primitive object={materials.skin} />
                        </RoundedBox>
                    </group>
                </group>

            </group>

            {/* --- LEGS (SITTING) --- */}
            <group position={[0, 0.5, 0]}>
                <Box args={[0.48, 0.25, 0.28]} position={[0, 0, 0]}><primitive object={materials.pants} /></Box> {/* Hips */}

                {/* Left Leg */}
                <group position={[-0.15, -0.1, 0.1]} rotation={[-1.4, 0.1, 0]}>
                    {/* Thigh */}
                    <RoundedBox args={[0.18, 0.55, 0.18]} radius={0.02} position={[0, 0.25, 0]}>
                        <primitive object={materials.pants} />
                    </RoundedBox>
                    {/* Knee */}
                    <group position={[0, 0.5, 0]} rotation={[1.6, 0, 0]}>
                        {/* Calf */}
                        <RoundedBox args={[0.16, 0.55, 0.16]} radius={0.02} position={[0, 0.25, 0]}>
                            <primitive object={materials.pants} />
                        </RoundedBox>
                        {/* Shoe */}
                        <group position={[0, 0.55, 0.05]} rotation={[0.2, 0, 0]}>
                            <RoundedBox args={[0.18, 0.12, 0.4]} radius={0.05} position={[0, 0, 0]}>
                                <primitive object={materials.shoes} />
                            </RoundedBox>
                            {/* Shoe Tongue */}
                            <Box args={[0.1, 0.02, 0.15]} position={[0, 0.08, -0.05]}><meshStandardMaterial color="#333" /></Box>
                        </group>
                    </group>
                </group>

                {/* Right Leg */}
                <group position={[0.15, -0.1, 0.1]} rotation={[-1.4, -0.1, 0]}>
                    <RoundedBox args={[0.18, 0.55, 0.18]} radius={0.02} position={[0, 0.25, 0]}>
                        <primitive object={materials.pants} />
                    </RoundedBox>
                    <group position={[0, 0.5, 0]} rotation={[1.8, 0, 0]}>
                        <RoundedBox args={[0.16, 0.55, 0.16]} radius={0.02} position={[0, 0.25, 0]}>
                            <primitive object={materials.pants} />
                        </RoundedBox>
                        <group position={[0, 0.55, 0.05]} rotation={[0.2, 0, 0]}>
                            <RoundedBox args={[0.18, 0.12, 0.4]} radius={0.05} position={[0, 0, 0]}>
                                <primitive object={materials.shoes} />
                            </RoundedBox>
                            <Box args={[0.1, 0.02, 0.15]} position={[0, 0.08, -0.05]}><meshStandardMaterial color="#333" /></Box>
                        </group>
                    </group>
                </group>
            </group>

        </group>
    )
}
