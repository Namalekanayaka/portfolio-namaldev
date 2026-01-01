import { Box } from '@react-three/drei'

export function Room() {
    // A nice corner room layout
    return (
        <group>
            {/* Floor */}
            <Box args={[16, 0.5, 16]} position={[0, -0.25, 0]} receiveShadow>
                <meshStandardMaterial color="#1f1f1f" roughness={0.8} />
            </Box>
            <Box args={[16.2, 0.5, 16.2]} position={[0, -0.75, 0]}>
                <meshStandardMaterial color="#000" /> {/* Base Shadow */}
            </Box>

            {/* Rug */}
            <Box args={[8, 0.1, 8]} position={[0, 0.05, 0]} receiveShadow>
                <meshStandardMaterial color="#333" roughness={1} />
            </Box>

            {/* Back Wall */}
            <Box args={[16, 10, 0.5]} position={[0, 4.75, -8]} receiveShadow>
                <meshStandardMaterial color="#252525" />
            </Box>
            {/* Baseboard Back */}
            <Box args={[16, 1, 0.6]} position={[0, 0.5, -8]}><meshStandardMaterial color="#111" /></Box>

            {/* Left Wall */}
            <Box args={[0.5, 10, 16]} position={[-8, 4.75, 0]} receiveShadow>
                <meshStandardMaterial color="#2a2a2a" />
            </Box>
            {/* Baseboard Left */}
            <Box args={[0.6, 1, 16]} position={[-8, 0.5, 0]}><meshStandardMaterial color="#111" /></Box>

            {/* Window (On Back Wall) */}
            <group position={[-3, 6, -7.8]}>
                <Box args={[4, 5, 0.2]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#000" emissive="#050510" />
                </Box>
                {/* Frame */}
                <Box args={[4.2, 5.2, 0.1]} position={[0, 0, 0.1]}><meshStandardMaterial color="#444" /></Box>
                <Box args={[4, 0.2, 0.2]}><meshStandardMaterial color="#444" /></Box>
                <Box args={[0.2, 5, 0.2]}><meshStandardMaterial color="#444" /></Box>
                {/* Glow from City Outside */}
                <pointLight position={[0, 0, 1]} intensity={2} color="#4444ff" distance={5} />
            </group>

            {/* Framed Posters (On Left Wall) */}
            <group position={[-7.7, 6, 2]} rotation={[0, Math.PI / 2, 0]}>
                <Box args={[3, 4, 0.1]}>
                    <meshStandardMaterial color="#fff" />
                </Box>
                <Box args={[2.8, 3.8, 0.12]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#111" /> {/* Art content */}
                    {/* Simple geometric art */}
                    <Box args={[1, 1, 0.1]} position={[0.5, 0.5, 0.05]}><meshStandardMaterial color="#ff4081" /></Box>
                    <Box args={[1, 1, 0.1]} position={[-0.5, -0.5, 0.05]}><meshStandardMaterial color="#4f46e5" /></Box>
                </Box>
            </group>

            {/* Shelf (On Back Wall) */}
            <group position={[4, 7, -7.5]}>
                <Box args={[5, 0.2, 1.5]}><meshStandardMaterial color="#444" /></Box>
                {/* Books */}
                <Box args={[0.3, 1, 0.8]} position={[-2, 0.6, 0]}><meshStandardMaterial color="#ff5555" /></Box>
                <Box args={[0.3, 1.2, 0.8]} position={[-1.6, 0.7, 0]}><meshStandardMaterial color="#5555ff" /></Box>
                <Box args={[0.3, 0.9, 0.8]} position={[-1.2, 0.55, 0]}><meshStandardMaterial color="#55ff55" /></Box>
            </group>
        </group>
    )
}
