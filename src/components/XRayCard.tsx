'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Code, Cpu, Database, Eye } from 'lucide-react';
import { Project } from '@/types';

interface XRayCardProps {
    project: Project;
    index: number;
}

export default function XRayCard({ project, index }: XRayCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    // Determine grid span classes
    const getSpanClasses = () => {
        switch (project.span) {
            case 'wide':
                return 'md:col-span-2';
            case 'tall':
                return 'md:row-span-2';
            default:
                return '';
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
        group relative overflow-hidden rounded-3xl cursor-none
        ${getSpanClasses()}
        min-h-[280px] md:min-h-[320px]
      `}
        >
            {/* 1. Base Background (Glass) */}
            <div className="absolute inset-0 bg-gray-900/40 glass z-0 transition-opacity duration-300">
                {/* Glow Effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: isHovered
                            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 40%)`
                            : 'none',
                    }}
                />
            </div>

            {/* 2. Content Layer (Normal View) - Inverse mask to hide where X-Ray is shown */}
            <div
                className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between pointer-events-none"
                style={{
                    maskImage: isHovered
                        ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, transparent 99px, black 100px)`
                        : 'none',
                    WebkitMaskImage: isHovered
                        ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, transparent 99px, black 100px)`
                        : 'none',
                }}
            >
                <div className="pointer-events-auto">
                    <motion.div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-20 mb-4`}
                    >
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span className="text-xs font-medium text-white uppercase tracking-wider">
                            {project.techStack[0]}
                        </span>
                    </motion.div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 shadow-black drop-shadow-md">
                        {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 drop-shadow-sm">
                        {project.description}
                    </p>
                </div>

                <div className="pointer-events-auto mt-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                            <span key={tech} className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-700/50">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>View Project</span>
                        <ExternalLink className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* 3. Inverted Color Layer - Same content with inverted colors */}
            <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    maskImage: isHovered ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, black 99px, transparent 100px)` : 'none',
                    WebkitMaskImage: isHovered ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, black 99px, transparent 100px)` : 'none',
                    filter: 'invert(1)',
                    opacity: isHovered ? 1 : 0,
                }}
            >
                {/* Clone of base background */}
                <div className="absolute inset-0 bg-gray-900/40 glass" />

                {/* Clone of content with same structure */}
                <div className="relative p-6 md:p-8 h-full flex flex-col justify-between">
                    <div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-20 mb-4`}>
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                            <span className="text-xs font-medium text-white uppercase tracking-wider">
                                {project.techStack[0]}
                            </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                            {project.title}
                        </h3>

                        <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-700/50">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                            <span>View Project</span>
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Gradient Border - True border, no fill */}
            <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]"
                style={{
                    border: '1px solid transparent',
                    backgroundImage: `linear-gradient(#111827, #111827), linear-gradient(135deg, ${project.gradient.includes('violet') ? 'rgb(139, 92, 246)' : project.gradient.includes('cyan') ? 'rgb(34, 211, 238)' : project.gradient.includes('emerald') ? 'rgb(52, 211, 153)' : 'rgb(251, 146, 60)'}, ${project.gradient.includes('fuchsia') ? 'rgb(217, 70, 239)' : project.gradient.includes('indigo') ? 'rgb(99, 102, 241)' : project.gradient.includes('teal') ? 'rgb(20, 184, 166)' : 'rgb(250, 204, 21)'})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                }}
            />

        </motion.div>
    );
}

