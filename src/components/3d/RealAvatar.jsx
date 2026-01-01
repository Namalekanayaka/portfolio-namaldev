import { useGLTF, useAnimations, Box } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Avatar(props) {
    const group = useRef()
    const { scene, animations } = useGLTF('/models/avatar.glb', true)
    const { actions } = useAnimations(animations, group)
    const [modelSize, setModelSize] = useState(null)

    // Debugging: Log loading status
    useEffect(() => {
        if (scene) {
            console.log("✅ Custom Avatar Loaded via useGLTF:", scene)

            // Calculate bounding box to check for scale issues
            const box = new THREE.Box3().setFromObject(scene)
            const size = new THREE.Vector3()
            box.getSize(size)
            console.log("📏 Model Dimensions:", size)
            setModelSize(size)

            // Enable shadows on all child meshes
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                }
            })
        }
    }, [scene])

    // Material Optimization: Fix Textures & Lighting
    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh) {

                    // 1. Keep original texture if it exists
                    const originalTexture = child.material.map || child.material.emissiveMap
                    const originalColor = child.material.color

                    // 2. Create a clean, reactive material
                    // This fixes issues where imported materials are too dark or have bad settings
                    child.material = new THREE.MeshStandardMaterial({
                        map: originalTexture || null, // Re-apply texture
                        color: originalTexture ? "white" : (originalColor || "#a0a0a0"), // If texture exists, white base. If not, use original color or silver.
                        roughness: 0.4,
                        metalness: 0.6,
                        envMapIntensity: 1.5 // Make it shiny using the environment
                    })

                    child.castShadow = true
                    child.receiveShadow = true
                }
            })
        }
    }, [scene])

    // Animation Logic
    useEffect(() => {
        if (!actions) return

        // Log animations
        // console.log("🎬 Available Animations:", Object.keys(actions))

        if (actions['Idle']) {
            actions['Idle'].reset().fadeIn(0.5).play()
        } else {
            const keys = Object.keys(actions)
            if (keys.length > 0) {
                actions[keys[0]].reset().fadeIn(0.5).play()
            }
        }

        return () => {
            if (actions) Object.values(actions).forEach(a => a?.stop())
        }
    }, [actions])

    return (
        <group ref={group} {...props} dispose={null}>
            {/* The Actual Model */}
            <primitive object={scene} />
        </group>
    )
}

useGLTF.preload('/models/avatar.glb')
