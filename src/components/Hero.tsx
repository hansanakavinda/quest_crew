'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Rocket, ArrowDown } from 'lucide-react';
import MagneticButton from './MagneticButton';
import ConstellationBackground from './ConstellationBackground';

gsap.registerPlugin(ScrollTrigger);

// Secondary button with X-Ray effect
function XRaySecondaryButton({ children, href }: { children: React.ReactNode; href: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.a
            ref={buttonRef}
            href={href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden px-8 py-4 rounded-full font-semibold text-lg border border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white transition-all duration-300"
        >
            {/* Normal content */}
            <span className="relative z-10">{children}</span>

            {/* Inverted Color Layer - X-Ray Effect */}
            <div
                className="absolute inset-0 z-20 pointer-events-none rounded-full overflow-hidden"
                style={{
                    maskImage: isHovered ? `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, black 49px, transparent 50px)` : 'none',
                    WebkitMaskImage: isHovered ? `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, black 49px, transparent 50px)` : 'none',
                    filter: 'invert(1)',
                    opacity: isHovered ? 1 : 0,
                }}
            >
                <div className="absolute inset-0 bg-gray-900 border border-gray-600" />
                <span className="absolute inset-0 flex items-center justify-center text-gray-300 font-semibold text-lg">
                    {children}
                </span>
            </div>
        </motion.a>
    );
}

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Kinetic Typography - Title Animation
            gsap.fromTo(
                titleRef.current,
                {
                    opacity: 0,
                    y: 100,
                    rotateX: -90,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                    delay: 0.3,
                }
            );

            // Subtitle Animation
            gsap.fromTo(
                subtitleRef.current,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.8,
                }
            );

            // CTA Animation
            gsap.fromTo(
                ctaRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    delay: 1.2,
                }
            );

            // Scroll indicator animation
            gsap.to('.scroll-indicator', {
                y: 10,
                opacity: 0.5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Backgrounds */}
            <div className="absolute inset-0 bg-background z-0" />
            <ConstellationBackground />
            <div className="absolute inset-0 grid-pattern opacity-30 z-0" />

            {/* Animated Gradient Orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass"
                >
                    <Rocket className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Mission-Driven Software Agency</span>
                </motion.div>

                {/* Main Title */}
                <h1
                    ref={titleRef}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                    style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                >
                    <span className="block text-white">We Build</span>
                    <span className="block text-gradient">Digital Excellence</span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Transforming ideas into high-performance software solutions
                    for startups and enterprises across tourism, healthcare, and tech.
                </p>

                {/* CTA Buttons */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <MagneticButton>
                        Start Your Project
                    </MagneticButton>
                    <XRaySecondaryButton href="#portfolio">
                        View Our Work
                    </XRaySecondaryButton>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ArrowDown className="w-5 h-5" />
            </div>
        </section>
    );
}

