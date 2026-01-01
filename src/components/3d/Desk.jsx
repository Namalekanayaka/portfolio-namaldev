import { Box, Cylinder } from '@react-three/drei'

export function Desk(props) {
    return (
        <group {...props}>
            {/* Table Top */}
            <Box args={[6, 0.2, 3]} position={[0, 2.8, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#2c2c2c" roughness={0.2} metalness={0.1} />
            </Box>

            {/* Legs (Metal Framework) */}
            <group>
                <Cylinder args={[0.08, 0.08, 2.8]} position={[-2.8, 1.4, -1.2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.08, 0.08, 2.8]} position={[2.8, 1.4, -1.2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.08, 0.08, 2.8]} position={[-2.8, 1.4, 1.2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.08, 0.08, 2.8]} position={[2.8, 1.4, 1.2]}><meshStandardMaterial color="#111" /></Cylinder>
            </group>

            {/* Monitor Stand */}
            <Box args={[0.8, 0.1, 0.6]} position={[0, 2.95, -0.5]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Box>

            {/* Computer Monitor */}
            <group position={[0, 3.8, -0.6]}>
                {/* Screen Frame */}
                <Box args={[3.2, 1.8, 0.15]}>
                    <meshStandardMaterial color="#050505" roughness={0.5} />
                </Box>
                {/* The Screen (Emissive) */}
                <Box args={[3.0, 1.6, 0.01]} position={[0, 0, 0.08]}>
                    <meshStandardMaterial color="#000000" emissive="#4f46e5" emissiveIntensity={1.5} />
                </Box>
                {/* Glowing Code Lines on Screen */}
                <Box args={[2, 0.05, 0.01]} position={[0, 0.2, 0.09]}><meshStandardMaterial color="#00ff00" emissive="#00ff00" /></Box>
                <Box args={[1.5, 0.05, 0.01]} position={[-0.2, 0, 0.09]}><meshStandardMaterial color="#00ff00" emissive="#00ff00" /></Box>
                <Box args={[1.8, 0.05, 0.01]} position={[0.1, -0.2, 0.09]}><meshStandardMaterial color="#00ff00" emissive="#00ff00" /></Box>
            </group>

            {/* Keyboard */}
            <group position={[0, 2.95, 0.6]} rotation={[0.05, 0, 0]}>
                <Box args={[1.6, 0.05, 0.6]}>
                    <meshStandardMaterial color="#222" />
                </Box>
                {/* Keys Glow */}
                <Box args={[1.4, 0.01, 0.4]} position={[0, 0.03, 0]}>
                    <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
                </Box>
            </group>

            {/* Mouse & Pad */}
            <group position={[1.2, 2.91, 0.6]}>
                <Box args={[0.8, 0.01, 0.7]}><meshStandardMaterial color="#333" /></Box>
                <Box args={[0.25, 0.15, 0.4]} position={[0, 0.08, 0]}>
                    <meshStandardMaterial color="#555" />
                    <Box args={[0.02, 0.02, 0.1]} position={[0, 0.08, -0.1]}><meshStandardMaterial color="#00ff00" emissive="#00ff00" /></Box>
                </Box>
            </group>

            {/* Chair (Simple) */}
            <group position={[0, 1.5, 1.8]}>
                {/* Seat */}
                <Box args={[1.8, 0.2, 1.8]} position={[0, 0, 0]}><meshStandardMaterial color="#333" /></Box>
                {/* Back */}
                <Box args={[1.8, 2.5, 0.2]} position={[0, 1.25, 0.9]}><meshStandardMaterial color="#333" /></Box>
                {/* Stem */}
                <Cylinder args={[0.15, 0.15, 1.5]} position={[0, -0.75, 0]}><meshStandardMaterial color="#555" /></Cylinder>
                {/* Base */}
                <Cylinder args={[1.2, 1.2, 0.2]} position={[0, -1.5, 0]}><meshStandardMaterial color="#222" /></Cylinder>
            </group>

        </group>
    )
}
