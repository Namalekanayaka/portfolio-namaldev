import { motion } from 'framer-motion'
import { useScroll } from '@react-three/drei'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const Section = (props) => {
    return (
        <section
            className={`h-screen w-screen flex flex-col justify-center p-8 md:p-20 ${props.mobile ? 'items-center' : ''} ${props.className || ''}`}
            style={{
                pointerEvents: 'none'
            }}
        >
            <div className={`w-full max-w-7xl mx-auto pointer-events-auto ${props.contentClassName || ''}`}>
                {props.children}
            </div>
        </section>
    )
}

export default function Overlay() {
    const scroll = useScroll()
    const form = useRef()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const sendEmail = (e) => {
        e.preventDefault()
        setLoading(true)

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
        // Sign up at https://www.emailjs.com/
        // 1. Create a service (e.g., Gmail) -> Get Service ID
        // 2. Create an email template -> Get Template ID
        // 3. Go to Account -> API Keys -> Get Public Key

        // Example: emailjs.sendForm('service_gmail', 'template_contact', form.current, 'user_xxxxxxxxxxxx')

        emailjs.sendForm('service_id', 'template_id', form.current, 'public_key')
            .then((result) => {
                console.log(result.text)
                setSuccess(true)
                setLoading(false)
                e.target.reset()

                // Reset success message after 5 seconds
                setTimeout(() => setSuccess(false), 5000)
            }, (error) => {
                console.log(error.text)
                setLoading(false)
                alert("Failed to send message. Please ensure you have set up your EmailJS keys in the code.")
            })
    }

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
    }

    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } }
    }

    return (
        <div className="flex flex-col w-full font-sans text-white">

            {/* 1. HOME: Minimal & Bold */}
            <Section className="items-start justify-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="max-w-4xl"
                >
                    <motion.div variants={fadeUp} className="mb-4 flex items-center gap-4">
                        <div className="h-[1px] w-20 bg-blue-400/50"></div>
                        <span className="text-blue-300 tracking-[0.3em] text-sm uppercase font-medium">Portfolio 2026</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-7xl md:text-9xl font-bold leading-[0.9] tracking-tighter mb-8">
                        NAMAL<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400">EKANAYAKE</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-2xl md:text-3xl text-slate-300 font-light max-w-2xl leading-relaxed">
                        Crafting digital experiences where <span className="text-white font-normal">software engineering</span> meets <span className="text-blue-300 font-normal">creative design</span>.
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-12 flex gap-6">
                        <button
                            onClick={() => scroll.el.scrollTo({ top: 2 * window.innerHeight, behavior: 'smooth' })}
                            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
                        >
                            View Projects
                        </button>
                        <button
                            onClick={() => scroll.el.scrollTo({ top: 4 * window.innerHeight, behavior: 'smooth' })}
                            className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors"
                        >
                            Contact Me
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 2 }}
                    className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-50"
                >
                    <span className="text-xs uppercase tracking-widest text-slate-500">Scroll to Explore</span>
                    <div className="h-20 w-[1px] bg-gradient-to-b from-blue-500 to-transparent"></div>
                </motion.div>
            </Section>

            {/* 2. ABOUT: Glass Card Right */}
            <Section className="items-end justify-center" contentClassName="flex justify-end">
                <motion.div
                    className="w-full md:w-[45%] bg-[#0a101f]/60 backdrop-blur-md border border-white/10 p-10 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={stagger}
                >
                    <motion.h2 variants={fadeUp} className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6">About Me</motion.h2>
                    <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                        Software Engineer with a vision for <span className="italic font-serif text-blue-200">perfection</span>.
                    </motion.h3>
                    <motion.div variants={fadeUp} className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
                        <p>
                            I am a 3rd-year undergraduate at NSBM Green University, specializing in building high-performance web applications using React, Three.js, and modern cloud technologies.
                        </p>
                        <p>
                            My passion lies in bridging the gap between functional code and immersive design, creating interfaces that feel alive.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="mt-10 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <div className="text-2xl font-bold text-white mb-1">3+</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider">Years Exp</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <div className="text-2xl font-bold text-white mb-1">20+</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider">Projects</div>
                        </div>
                    </motion.div>
                </motion.div>
            </Section>

            {/* 3. PROJECTS: Carousel / Grid */}
            <Section className="items-center justify-center">
                <motion.div
                    className="text-center w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.h2 variants={fadeUp} className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-16">
                        Selected Work
                    </motion.h2>

                    <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <ProjectCard
                            title="Realin Traders"
                            subtitle="American Marketing Agency Platform"
                            tags={['PayloadCMS', 'TypeScript', 'MongoDB', 'Tailwind']}
                            color="bg-orange-500"
                            link="https://reliance-traders.vercel.app/"
                        />
                        <ProjectCard
                            title="Doctor POS"
                            subtitle="Clinical Pharmacy & Inventory System"
                            tags={['React', 'Tailwind', 'MongoDB']}
                            color="bg-teal-500"
                            link="#"
                        />
                        <ProjectCard
                            title="Smart Water AI"
                            subtitle="AI-Powered National Water Grid"
                            tags={['React', 'Tailwind', 'Firebase']}
                            color="bg-blue-500"
                            link="https://aquaalert-delta.vercel.app/"
                        />
                        <ProjectCard
                            title="MindCheck"
                            subtitle="AI Mental Health Assessment Platform"
                            tags={['React', 'Firebase', 'Gemini AI', 'Recharts']}
                            color="bg-purple-500"
                            link="https://mind-check-mentalhealth.vercel.app/"
                        />
                    </motion.div>
                </motion.div>
            </Section>

            {/* 4. SKILLS: Minimal List */}
            <Section className="items-start justify-center">
                <motion.div
                    className="w-full md:w-1/2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.h2 variants={fadeUp} className="text-8xl font-black text-white/5 mb-[-40px] ml-[-10px] select-none">
                        STACK
                    </motion.h2>
                    <motion.h3 variants={fadeUp} className="text-5xl font-bold mb-12 relative z-10">
                        Technical Arsenal
                    </motion.h3>

                    <div className="grid grid-cols-1 gap-8">
                        <SkillGroup title="Frontend" skills={['React.js', 'Three.js / R3F', 'Tailwind CSS', 'Framer Motion', 'GSAP']} delay={0.1} />
                        <SkillGroup title="Backend" skills={['Node.js', 'Express', 'Firebase', 'MongoDB', 'Supabase']} delay={0.2} />
                        <SkillGroup title="Tools" skills={['Git', 'Figma', 'Vite', 'Docker', 'Vercel']} delay={0.3} />
                    </div>
                </motion.div>
            </Section>

            {/* 5. CONTACT: Center Stage */}
            <Section className="items-center justify-center">
                <motion.div
                    className="w-full max-w-xl text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6">
                        Let's Talk
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-xl text-slate-300 mb-12">
                        Got an idea? I'm available for freelance work and internships.
                    </motion.p>

                    <motion.form
                        ref={form}
                        onSubmit={sendEmail}
                        variants={fadeUp}
                        className="space-y-4 text-left bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                name="user_name"
                                type="text"
                                placeholder="Name"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                            />
                            <input
                                name="user_email"
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <textarea
                            name="message"
                            rows={4}
                            placeholder="Your Message..."
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                        ></textarea>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-lg font-bold text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]
                                ${success ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-500'}
                                ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                        >
                            {loading ? 'Sending...' : success ? 'Message Sent!' : 'Send Message'}
                        </button>
                    </motion.form>

                    <motion.div variants={fadeUp} className="mt-12 flex justify-center gap-8 opacity-50">
                        <a href="https://github.com/Namalekanayaka" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
                        <a href="https://www.linkedin.com/in/namal-ekanayake-436a42266" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Instagram</a>
                    </motion.div>
                </motion.div>
            </Section>

        </div>
    )
}

function ProjectCard({ title, subtitle, tags, color, link }) {
    return (
        <a
            href={link || "#"}
            target={link && link !== "#" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="group relative bg-[#0a101f]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:bg-[#0a101f] transition-all duration-300 hover:border-white/20 text-left cursor-pointer overflow-hidden block"
        >
            {/* Gradient Glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 ${color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>

            <h3 className="text-2xl font-bold mb-2 relative z-10">{title}</h3>
            <p className="text-slate-400 mb-6 text-sm relative z-10">{subtitle}</p>

            <div className="flex flex-wrap gap-2 relative z-10">
                {tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-slate-300 border border-white/5">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Arrow Icon for Link */}
            {link && link !== "#" && (
                <div className="absolute bottom-8 right-8 text-white/20 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
            )}
        </a>
    )
}

function SkillGroup({ title, skills, delay }) {
    return (
        <div className="relative pl-8 border-l border-white/10">
            <h4 className="text-lg font-bold text-blue-400 mb-3 uppercase tracking-wider">{title}</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {skills.map((skill, i) => (
                    <span key={i} className="text-xl md:text-2xl text-slate-300 font-light hover:text-white transition-colors cursor-default">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}
