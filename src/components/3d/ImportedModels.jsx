import { useGLTF } from '@react-three/drei'

export function DeskEnvironment(props) {
    // "harry_potter_desk_diorama.glb"
    const { scene } = useGLTF('/models/harry_potter_desk_diorama.glb')
    return <primitive object={scene} {...props} />
}

export function Computer(props) {
    // "tatung_einstein_tc-01.glb"
    const { scene } = useGLTF('/models/tatung_einstein_tc-01.glb')
    return <primitive object={scene} {...props} />
}

export function Character(props) {
    // "5dc6ecbea1bb1655387ec7e2aa416f2a.glb"
    // This file is large (33MB), might take time to load.
    const { scene } = useGLTF('/models/5dc6ecbea1bb1655387ec7e2aa416f2a.glb')
    return <primitive object={scene} {...props} />
}

// Preload to help with performance
useGLTF.preload('/models/harry_potter_desk_diorama.glb')
useGLTF.preload('/models/tatung_einstein_tc-01.glb')
useGLTF.preload('/models/5dc6ecbea1bb1655387ec7e2aa416f2a.glb')
