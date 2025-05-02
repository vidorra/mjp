'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Easing function for smooth transitions
const easeInOut = (t: number): number => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

interface Photo {
  id?: number;
  src: string;
  alt?: string;
}

interface VerticalPhotoStackProps {
  photos: Photo[];
  containerHeight?: number;
}

const VerticalPhotoStack: React.FC<VerticalPhotoStackProps> = ({ photos, containerHeight = 1800 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (containerHeight - window.innerHeight)));
        setScrollY(scrollProgress);
        
        // Calculate which photo should be on top based on scroll
        const newActiveIndex = Math.floor(scrollProgress * photos.length) % photos.length;
        if (newActiveIndex !== activeIndex) {
          setActiveIndex(newActiveIndex);
        }
      }
    };

    // Initial calculation on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerHeight, photos.length, activeIndex]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${containerHeight}px` }}
      className="relative"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        <div className="relative w-full h-full max-w-[85vw] 2xl:max-w-[1600px] mx-auto">
          {photos.map((photo, index) => {
            const stackPosition = (photos.length + activeIndex - index) % photos.length;
            const zIndex = photos.length - stackPosition;
            
            let rotation = 0;
            let yPosition = 0;
            let xPosition = 0;
            let scale = 1;
            // Set initial positions
            if (stackPosition === 0) {
              rotation = 0;
              yPosition = 0;
              xPosition = 0;
              scale = 1.15;
            } else {
              rotation = -2.5;
              yPosition = 1.5;
              xPosition = -2.5;
              scale = 1;
            }
            
            const slideProgress = (scrollY * 2) % 1;
            const isSliding = Math.floor(scrollY * photos.length) % photos.length === index;
            
            // Determine if photo should move based on its position in the sequence
            const isSliding = index === currentPhotoIndex % photos.length ||
                            index === (currentPhotoIndex + 1) % photos.length ||
                            index === (currentPhotoIndex - 1 + photos.length) % photos.length;
            
            // Calculate next position properties
            const nextPosition = (stackPosition + 1) % photos.length;
            const nextRotation = nextPosition === 0 ? 0 : -2.5;
            const nextYPosition = nextPosition === 0 ? 0 : 1.5;
            const nextXPosition = nextPosition === 0 ? 0 : -2.5;
            const nextScale = nextPosition === 0 ? 1.15 : 1;
            
            // Apply smooth transitions when photo should move
            if (isSliding) {
              const acceleratedProgress = easeInOut(slideProgress);
              rotation = rotation + (nextRotation - rotation) * acceleratedProgress;
              yPosition = yPosition + (nextYPosition - yPosition) * acceleratedProgress;
              xPosition = xPosition + (nextXPosition - xPosition) * acceleratedProgress;
              scale = scale + (nextScale - scale) * acceleratedProgress;
            }
            
            return (
              <div
                key={photo.id || index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: stackPosition === 0 ? '-2.5vw' : '-5vw',
                  marginTop: '-25vh',
                  maxWidth: '760px',
                  maxHeight: '506px',
                  transform: `translate(${xPosition}vw, ${yPosition}vh) rotate(${rotation}deg) scale(${scale})`,
                  zIndex: zIndex,
                  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="shadow-xl"
              >
                <div className="relative w-[55vw] max-w-[760px] aspect-[3/2] overflow-hidden rounded-lg">
                  <Image
                    src={photo.src}
                    alt={photo.alt || `Photo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                    style={{ 
                      objectFit: 'cover',
                      borderRadius: '8px' 
                    }}
                    priority={stackPosition === 0}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerticalPhotoStack;