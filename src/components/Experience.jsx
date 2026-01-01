import { Environment, Stars, SpotLight, BakeShadows, Float, useGLTF } from '@react-three/drei'
import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useLayoutEffect, useMemo, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import HeroStage from './HeroStage'
import ErrorBoundary from './ErrorBoundary'

// Preload the heavy model
useGLTF.preload('/models/avatar.glb')

export default function Experience() {
    const scroll = useScroll()
    const { camera, size, viewport } = useThree()
    const tl = useRef()
    const [isMobile, setIsMobile] = useState(false)

    // The focus point (The Character's Head/Chest approx)
    const cameraTarget = useRef({ x: 0, y: 0.5, z: 0 })

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useLayoutEffect(() => {
        tl.current = gsap.timeline({ paused: true })

        // Mobile vs Desktop Camera positions
        // Mobile needs Z to be larger (zoomed out) because FOV is vertical-constrained often
        const m = isMobile ? 1.5 : 1 // Multiplier for distance
        const mobX = isMobile ? 0 : -3 // Center on mobile

        // 0. INITIAL STATE
        // Mobile: Move Z far back (22) to fit full height in narrow portrait view
        camera.position.set(isMobile ? 0 : -3, 0, isMobile ? 22 : 8)
        cameraTarget.current = { x: 0, y: -0.5, z: 0 }

        // 1. INTRO
        tl.current
            .to(camera.position, {
                x: isMobile ? 0 : -4,
                y: 0.5,
                z: isMobile ? 18 : 5,
                duration: 1.5,
                ease: "power2.inOut"
            }, 0)
            .to(cameraTarget.current, {
                x: 0, y: -0.2, z: 0, duration: 1.5, ease: "power2.inOut"
            }, 0)

        // 2. PROJECTS
        tl.current
            .to(camera.position, {
                x: isMobile ? 1 : 4,
                y: 1,
                z: isMobile ? 20 : 6,
                duration: 2,
                ease: "power1.inOut"
            }, 1.5)
            .to(cameraTarget.current, {
                x: 0, y: -0.5, z: 0, duration: 2, ease: "power1.inOut"
            }, 1.5)

        // 3. SKILLS
        tl.current
            .to(camera.position, {
                x: 0,
                y: isMobile ? 6 : 6,
                z: isMobile ? 15 : 3,
                duration: 1.5,
                ease: "power2.inOut"
            }, 4)
            .to(cameraTarget.current, {
                x: 0, y: -1, z: 0, duration: 1.5, ease: "power2.inOut"
            }, 4)

        // 4. CONTACT
        tl.current
            .to(camera.position, {
                x: 0,
                y: -0.5,
                z: isMobile ? 18 : 6,
                duration: 1.5,
                ease: "power2.out"
            }, 5.5)
            .to(cameraTarget.current, {
                x: 0, y: 0, z: 0, duration: 1.5, ease: "power2.out"
            }, 5.5)

        // Force update first frame
        tl.current.seek(0)
    }, [isMobile]) // Re-run if mobile state changes

    useFrame(() => {
        if (tl.current) tl.current.seek(scroll.offset * tl.current.duration())
        camera.lookAt(cameraTarget.current.x, cameraTarget.current.y, cameraTarget.current.z)
    })

    return (
        <>
            <ambientLight intensity={1.5} />

            {/* HERO SPOTLIGHT */}
            <SpotLight
                position={[2, 3, 5]}
                target-position={[0, 0, 0]}
                angle={0.4}
                penumbra={0.5}
                intensity={20}
                color="white"
                distance={20}
            />

            {/* Key Light */}
            <SpotLight
                position={[5, 5, 5]}
                angle={0.5}
                penumbra={1}
                intensity={8}
                color="#b3e0ff"
            />

            {/* Rim Light */}
            <SpotLight
                position={[-5, 5, -2]}
                angle={0.5}
                penumbra={1}
                intensity={10}
                color="#00ffff"
            />

            {/* Rim Light Back */}
            <SpotLight
                position={[5, 0, -5]}
                angle={0.8}
                penumbra={1}
                intensity={5}
                color="#ff0080"
            />

            <pointLight position={[0, 2, 5]} intensity={1} color="white" />

            {/* Reduce stars/particles on mobile if needed, but 500 is likely ok. Optimized depth/radius though */}
            <Stars radius={50} depth={50} count={isMobile ? 200 : 500} factor={4} saturation={0} fade speed={0.5} />

            <Environment preset="city" blur={0.8} background={false} />

            <ErrorBoundary fallback={null}>
                <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
                    <HeroStage isMobile={isMobile} />
                </Float>
            </ErrorBoundary>

            {/* Disable Post Processing on Mobile for Performance */}
            {!isMobile && (
                <EffectComposer disableNormalPass multisampling={0}>
                    <Bloom luminanceThreshold={1.2} mipmapBlur intensity={1.2} radius={0.5} />
                    <Vignette eskil={false} offset={0.1} darkness={0.8} />
                    <Noise opacity={0.03} />
                </EffectComposer>
            )}
        </>
    )
}
