import { useProgress } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const playStartupSound = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!AudioContext) return

        const ctx = new AudioContext()
        const t = ctx.currentTime

        // Master gain for fade out
        const masterGain = ctx.createGain()
        masterGain.connect(ctx.destination)
        masterGain.gain.setValueAtTime(0.5, t)
        masterGain.gain.linearRampToValueAtTime(0, t + 4.0)

        // 1. Warm Pad (Base Harmony)
        const osc1 = ctx.createOscillator()
        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(220, t) // A3
        osc1.connect(masterGain)
        osc1.start(t)
        osc1.stop(t + 4.0)

        const osc2 = ctx.createOscillator()
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(329.63, t) // E4
        osc2.connect(masterGain)
        osc2.start(t)
        osc2.stop(t + 4.0)

        // 2. Chime / Bell Harmonics (The "Digital" feel)
        const createChime = (freq, time, decay) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.frequency.setValueAtTime(freq, time)
            osc.type = 'sine'

            gain.gain.setValueAtTime(0, time)
            gain.gain.linearRampToValueAtTime(0.3, time + 0.05)
            gain.gain.exponentialRampToValueAtTime(0.001, time + decay)

            osc.connect(gain)
            gain.connect(masterGain)
            osc.start(time)
            osc.stop(time + decay)
        }

        // Arpeggio rising
        createChime(440, t + 0.1, 2.0) // A4
        createChime(554.37, t + 0.3, 2.0) // C#5
        createChime(659.25, t + 0.5, 2.5) // E5
        createChime(880, t + 0.8, 3.0) // A5

        // 3. Subtle "Swoosh" / White Noise Filter sweep
        const bufferSize = ctx.sampleRate * 3
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1
        }

        const noise = ctx.createBufferSource()
        noise.buffer = buffer
        const noiseFilter = ctx.createBiquadFilter()
        noiseFilter.type = 'lowpass'
        noiseFilter.frequency.setValueAtTime(100, t)
        noiseFilter.frequency.exponentialRampToValueAtTime(800, t + 2)

        const noiseGain = ctx.createGain()
        noiseGain.gain.setValueAtTime(0.05, t)
        noiseGain.gain.linearRampToValueAtTime(0, t + 3)

        noise.connect(noiseFilter)
        noiseFilter.connect(noiseGain)
        noiseGain.connect(masterGain)
        noise.start(t)

    } catch (e) {
        console.warn("Audio play failed", e)
    }
}

export function LoadingScreen({ started, onStarted }) {
    const { progress } = useProgress()
    const [animationFinished, setAnimationFinished] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const hasPlayedSound = useRef(false)

    useEffect(() => {
        // Enforce minimum animation time of 3-4s
        const timer = setTimeout(() => {
            setAnimationFinished(true)
        }, 3500)

        // Attempt sound play on mount
        const handleInteraction = () => {
            if (!hasPlayedSound.current) {
                playStartupSound()
                hasPlayedSound.current = true
            }
            window.removeEventListener('click', handleInteraction)
            window.removeEventListener('keydown', handleInteraction)
        }

        window.addEventListener('click', handleInteraction)
        window.addEventListener('keydown', handleInteraction)

        if (!hasPlayedSound.current) {
            playStartupSound()
            hasPlayedSound.current = true
        }

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (progress === 100 && animationFinished) {
            setTimeout(() => setShowButton(true), 500)
        }
    }, [progress, animationFinished])

    // Generate random particles
    const particles = useRef(Array.from({ length: 30 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 2 + 3,
        delay: Math.random() * 2
    }))).current

    return (
        <AnimatePresence>
            {!started && (
                <motion.div
                    className="fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center font-sans"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
                    style={{
                        // Windows 7 Aurora Background: Deep Navy transitioning to lighter Cyan/Teal
                        background: 'radial-gradient(circle at 50% 100%, #1e5799 0%, #2989d8 10%, #207cca 20%, #041525 80%)',
                        perspective: '1000px'
                    }}
                >
                    {/* Background Light Rays / Aurora Waves */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 50%']
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
                        style={{
                            background: 'linear-gradient(125deg, transparent 0%, rgba(56,183,234,0.1) 40%, rgba(135,225,245,0.2) 50%, rgba(56,183,234,0.1) 60%, transparent 100%)',
                            backgroundSize: '200% 200%'
                        }}
                    />

                    {/* Subtle noise grains for that "monitor" feel */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />

                    {/* Floating Particles */}
                    {particles.map((p, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white opacity-20 pointer-events-none"
                            initial={{ x: `${p.x}vw`, y: `${p.y}vh`, scale: 0 }}
                            animate={{
                                y: [`${p.y}vh`, `${p.y - 10}vh`],
                                opacity: [0, 0.4, 0]
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                delay: p.delay,
                                ease: "easeInOut"
                            }}
                            style={{ width: p.size, height: p.size, filter: 'blur(1px)' }}
                        />
                    ))}

                    {/* Main Interaction Container */}
                    <div className="relative z-10 flex flex-col items-center">

                        {/* Logo Animation Container */}
                        <div className="relative w-32 h-32 mb-12">
                            {/* 
                                Windows 7 Original Flag Colors:
                                Top-Left: Red (#f34f1c)
                                Top-Right: Green (#7fba00)
                                Bottom-Left: Blue (#01a6f0)
                                Bottom-Right: Yellow (#ffb900)
                            */}
                            {[{ color: '#f34f1c', x: -100, y: -100 }, // Red
                            { color: '#7fba00', x: 100, y: -100 },  // Green
                            { color: '#01a6f0', x: -100, y: 100 },  // Blue
                            { color: '#ffb900', x: 100, y: 100 }    // Yellow
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute inset-0 border bg-white/5 backdrop-blur-md rounded-lg"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.5,
                                        x: item.x,
                                        y: item.y,
                                        rotate: (Math.random() * 90) - 45
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: 0,
                                        y: 0,
                                        rotate: 0,
                                        borderColor: `rgba(255,255,255,0.3)` // Settle to white/clean
                                    }}
                                    transition={{
                                        duration: 3,
                                        ease: [0.2, 0.65, 0.3, 0.9],
                                    }}
                                    style={{
                                        // Dynamic changing shadow/glow matching the Windows color during flight
                                        boxShadow: `0 0 30px ${item.color}60`,
                                        // Composite shape logic
                                        clipPath: index === 0 ? 'polygon(0 0, 100% 0, 100% 50%, 0 100%)' :
                                            index === 1 ? 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' :
                                                index === 2 ? 'polygon(0 0, 100% 50%, 100% 100%, 0 100%)' : // variation
                                                    'polygon(0 50%, 100% 0, 100% 100%, 0 100%)'
                                    }}
                                >
                                    {/* Inner Color Glow that fades out */}
                                    <motion.div
                                        className="absolute inset-0 opacity-50"
                                        style={{ backgroundColor: item.color }}
                                        animate={{ opacity: 0 }}
                                        transition={{ delay: 2, duration: 1 }}
                                    />
                                </motion.div>
                            ))}

                            {/* Central Glowing Core / Initials */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center z-20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.5, duration: 1.5 }}
                            >
                                <span className="text-5xl font-light text-white tracking-widest drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]" style={{ fontFamily: '"Segoe UI", "Outfit", sans-serif' }}>
                                    NE
                                </span>
                            </motion.div>

                            {/* Bloom Flare */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 w-56 h-1 bg-white rounded-full z-30"
                                initial={{ x: "-50%", y: "-50%", scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: [0, 1.5, 0], opacity: [0, 0.8, 0] }}
                                transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
                                style={{ filter: 'blur(8px)', boxShadow: '0 0 20px cyan' }}
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.div
                            className="flex flex-col items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 2 }}
                        >
                            <div className="text-white/90 text-sm tracking-[0.2em] font-normal mb-6 shadow-black drop-shadow-md">
                                Starting Portfolio...
                            </div>

                            {/* Loading Bar - Windows 7 / Vista style (Glossy Green/Cyan) */}
                            <div className="w-56 h-[6px] bg-[#0d1e2b] rounded-full overflow-hidden border border-[#3e586b] shadow-inner relative">
                                {/* Moving gloss highlight */}
                                <motion.div
                                    className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                                    initial={{ x: -100 }}
                                    animate={{ x: 300 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    style={{ zIndex: 10 }}
                                />
                                {/* Progress Fill */}
                                <motion.div
                                    className="h-full bg-gradient-to-b from-[#bcfb58] to-[#40c313]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    style={{
                                        boxShadow: '0 0 10px #7fba00',
                                        zIndex: 5
                                    }}
                                />
                            </div>
                            <div className="mt-3 text-xs text-cyan-200/50">
                                © 2026 namalekanayaka All rights reserved.
                            </div>
                        </motion.div>

                        {/* Enter Button (Appears after load) */}
                        <AnimatePresence>
                            {(showButton || (progress === 100 && animationFinished)) && (
                                <motion.button
                                    onClick={onStarted}
                                    className="mt-16 group relative px-10 py-3 overflow-hidden rounded-[2px] transition-all duration-300 pointer-events-auto"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#eefcfc] to-[#a3d6f5] opacity-10 border border-white/40" />
                                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                                    <span className="relative z-10 text-white font-normal tracking-[0.1em] text-sm drop-shadow-md flex items-center gap-2">
                                        <span>Log On</span>
                                        <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer / Copyright subtle */}
                    <div className="absolute bottom-4 left-6 text-white/30 text-[11px] tracking-wide font-sans">
                        Namal Ekanayaka <span className="mx-2">•</span> Portfolio Ultimate
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
