'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MagneticButtonProps } from '@/types';

export default function MagneticButton({
    children,
    className = '',
    onClick
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Track mouse position relative to button for X-Ray effect
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        gsap.to(buttonRef.current, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!buttonRef.current) return;

        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    return (
        <button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`
        relative overflow-hidden px-8 py-4 rounded-full
        font-semibold text-lg transition-all duration-300
        bg-purple-600
        hover:bg-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]
        ${isHovered ? 'scale-105' : 'scale-100'}
        ${className}
      `}
        >
            {/* Normal content */}
            <span className="relative z-10 text-white">{children}</span>

            {/* Hover overlay */}
            <div
                className={`
          absolute inset-0 bg-purple-500
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
            />

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
                {/* Clone of button content with same styling */}
                <div className="absolute inset-0 bg-purple-600" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                    {children}
                </span>
            </div>
        </button>
    );
}

