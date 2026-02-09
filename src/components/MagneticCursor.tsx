'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function MagneticCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [isMagnetic, setIsMagnetic] = useState(false);

    useEffect(() => {
        // Setup GSAP QuickSetters for performance
        const cursorX = gsap.quickSetter(cursorRef.current, 'x', 'px');
        const cursorY = gsap.quickSetter(cursorRef.current, 'y', 'px');

        let mouseX = 0;
        let mouseY = 0;
        let currentMagneticElement: Element | null = null;

        // Mouse move handler
        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update center dot immediately (always follows mouse)
            cursorX(mouseX);
            cursorY(mouseY);

            // Check for magnetic elements
            const target = e.target as HTMLElement;
            const magneticElement = target.closest('[data-magnetic="true"]');

            if (magneticElement) {
                // Read attributes from the magnetic element
                const isSticky = magneticElement.getAttribute('data-cursor-sticky') !== 'false';
                const customText = magneticElement.getAttribute('data-cursor-text');
                const customSize = magneticElement.getAttribute('data-cursor-size');

                // Only trigger expansion animation when entering a NEW magnetic element
                if (magneticElement !== currentMagneticElement) {
                    currentMagneticElement = magneticElement;
                    setIsMagnetic(true);

                    // Animate ring expansion
                    const size = customSize ? parseInt(customSize) : 100;

                    gsap.to(ringRef.current, {
                        width: size,
                        height: size,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderWidth: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    // Handle text visibility
                    if (customText === "") {
                        // Empty string = hide text
                        gsap.to(textRef.current, {
                            opacity: 0,
                            scale: 0.5,
                            duration: 0.2
                        });
                    } else {
                        // Show custom or default text
                        if (textRef.current) {
                            textRef.current.innerText = customText || "EXPLORE";
                        }
                        gsap.to(textRef.current, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.3,
                            delay: 0.1
                        });
                    }
                }

                // ALWAYS update ring position based on sticky mode
                if (isSticky) {
                    // Snap to center of element
                    const rect = magneticElement.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    gsap.to(ringRef.current, {
                        x: centerX,
                        y: centerY,
                        duration: 0.6,
                        ease: 'power3.out'
                    });
                } else {
                    // Follow mouse freely
                    gsap.to(ringRef.current, {
                        x: mouseX,
                        y: mouseY,
                        duration: 0.15,
                        ease: 'power2.out'
                    });
                }

            } else {
                // Not hovering over any magnetic element
                if (currentMagneticElement !== null) {
                    currentMagneticElement = null;
                    setIsMagnetic(false);

                    // Reset ring to default state
                    gsap.to(ringRef.current, {
                        width: 30,
                        height: 30,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        duration: 0.4
                    });

                    // Hide text
                    gsap.to(textRef.current, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.2
                    });
                }

                // Standard follow when not on magnetic element
                gsap.to(ringRef.current, {
                    x: mouseX,
                    y: mouseY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Center Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />

            {/* Magnetic Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            >
                <span
                    ref={textRef}
                    className="text-[10px] font-bold tracking-widest text-white opacity-0 transform scale-50"
                >
                    EXPLORE
                </span>
            </div>
        </div>
    );
}
