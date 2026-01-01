import { Environment, Stars, SpotLight, BakeShadows, Float } from '@react-three/drei'
import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useLayoutEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import HeroStage from './HeroStage'
import ErrorBoundary from './ErrorBoundary'

export default function Experience() {
    const scroll = useScroll()
    const { camera } = useThree()
    const tl = useRef()

    // The focus point (The Character's Head/Chest approx)
    const cameraTarget = useRef({ x: 0, y: 0.5, z: 0 })

    useLayoutEffect(() => {
        tl.current = gsap.timeline({ paused: true })

        // 0. INITIAL STATE (Scroll 0) - Full Body Frontal
        // Moved back (z: 8) and less extreme angle (x: -3) to ensure full body visibility 
        // Target lowered to y: -0.5 (Torso center) to capture feet and head over scale
        camera.position.set(-3, 0, 8)
        cameraTarget.current = { x: 0, y: -0.5, z: 0 }

        // 1. INTRO -> WHO AM I (Side Profile Close Up -> Pulled back)
        tl.current
            .to(camera.position, {
                x: -4, y: 0.5, z: 5, duration: 1.5, ease: "power2.inOut"
            }, 0)
            .to(cameraTarget.current, {
                x: 0, y: -0.2, z: 0, duration: 1.5, ease: "power2.inOut"
            }, 0)

        // 2. PROJECTS (Orbit to other side -> Pulled back)
        tl.current
            .to(camera.position, {
                x: 4, y: 1, z: 6, duration: 2, ease: "power1.inOut"
            }, 1.5)
            .to(cameraTarget.current, {
                x: 0, y: -0.5, z: 0, duration: 2, ease: "power1.inOut"
            }, 1.5)

        // 3. SKILLS (Top Down -> Higher up to see full spread)
        tl.current
            .to(camera.position, {
                x: 0, y: 6, z: 3, duration: 1.5, ease: "power2.inOut"
            }, 4)
            .to(cameraTarget.current, {
                x: 0, y: -1, z: 0, duration: 1.5, ease: "power2.inOut"
            }, 4)

        // 4. CONTACT (Low Angle Hero Shot -> Further back)
        tl.current
            .to(camera.position, {
                x: 0, y: -0.5, z: 6, duration: 1.5, ease: "power2.out"
            }, 5.5)
            .to(cameraTarget.current, {
                x: 0, y: 0, z: 0, duration: 1.5, ease: "power2.out"
            }, 5.5)

    }, [])

    useFrame(() => {
        // Sync Timeline to Scroll
        // Added smooth factor manually if needed, but scroll.offset is usually sufficient
        if (tl.current) tl.current.seek(scroll.offset * tl.current.duration())

        // Always look at the target
        camera.lookAt(cameraTarget.current.x, cameraTarget.current.y, cameraTarget.current.z)
    })

    return (
        <>
            <ambientLight intensity={1.5} />

            {/* HERO SPOTLIGHT: Targeted directly at the Center Character */}
            <SpotLight
                position={[2, 3, 5]}
                target-position={[0, 0, 0]}
                angle={0.4}
                penumbra={0.5}
                intensity={20} // Very bright to ensure visibility
                color="white"
                distance={20}
            />

            {/* Optimized Lighting: No Shadows for Performance */}
            {/* Main Key Light (Warm) - Metallic Highlight */}
            <SpotLight
                position={[5, 5, 5]}
                angle={0.5}
                penumbra={1}
                intensity={8}
                color="#b3e0ff"
            />

            {/* Rim Light (Cool/Cyber) - Left */}
            <SpotLight
                position={[-5, 5, -2]}
                angle={0.5}
                penumbra={1}
                intensity={10}
                color="#00ffff"
            />

            {/* Rim Light (Pink/Cyber) - Right Back */}
            <SpotLight
                position={[5, 0, -5]}
                angle={0.8}
                penumbra={1}
                intensity={5}
                color="#ff0080"
            />

            {/* Fill Light */}
            <pointLight position={[0, 2, 5]} intensity={1} color="white" />

            {/* Subtle floating dust - Reduced count for performance */}
            <Stars radius={50} depth={50} count={500} factor={4} saturation={0} fade speed={0.5} />

            {/* Environment Map - City preset is good for reflections on robot metal */}
            <Environment preset="city" blur={0.8} background={false} />

            {/* The Stage */}
            <ErrorBoundary fallback={null}>
                <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
                    <HeroStage />
                </Float>
            </ErrorBoundary>

            {/* Optimized Post Processing */}
            {/* Multisample disabled on some passes to save fill-rate */}
            <EffectComposer disableNormalPass multisampling={0}>
                {/* Intense bloom for robot glowing parts */}
                <Bloom luminanceThreshold={1.2} mipmapBlur intensity={1.2} radius={0.5} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
                <Noise opacity={0.03} />
            </EffectComposer>
        </>
    )
}
