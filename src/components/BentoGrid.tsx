'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { projects } from '@/lib/constants';
import XRayCard from './XRayCard';

gsap.registerPlugin(ScrollTrigger);

export default function BentoGrid() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.bento-title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.bento-title',
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            className="relative py-24 md:py-32 px-6"
        >
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-purple-400 text-sm font-medium uppercase tracking-widest mb-4 block"
                    >
                        Our Portfolio
                    </motion.span>
                    <h2 className="bento-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore our latest work delivering cutting-edge solutions across AI, web, and enterprise systems.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {projects.map((project, index) => (
                        <XRayCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
