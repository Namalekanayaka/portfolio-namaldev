import { Box } from '@react-three/drei'

export function Bed(props) {
    return (
        <group {...props}>
            {/* Frame */}
            <Box args={[6, 1.2, 9]} position={[0, 0.6, 0]}>
                <meshStandardMaterial color="#2d2d2d" />
            </Box>

            {/* Mattress */}
            <Box args={[5.8, 0.5, 8.8]} position={[0, 1.4, 0]}>
                <meshStandardMaterial color="#ddd" roughness={0.8} />
            </Box>

            {/* Sheets/Blanket (Messy look) */}
            <group position={[0, 1.7, 1]}>
                <Box args={[6, 0.2, 7]} rotation={[0.05, 0, 0]}>
                    <meshStandardMaterial color="#4f46e5" roughness={0.9} />
                </Box>
            </group>

            {/* Pillows */}
            <group position={[0, 1.8, -3.5]}>
                <Box args={[2.5, 0.4, 1.5]} position={[-1.5, 0, 0]} rotation={[0.2, 0, 0]}>
                    <meshStandardMaterial color="#ffffff" />
                </Box>
                <Box args={[2.5, 0.4, 1.5]} position={[1.5, 0, 0]} rotation={[0.2, 0.1, 0]}>
                    <meshStandardMaterial color="#ffffff" />
                </Box>
            </group>
        </group>
    )
}
