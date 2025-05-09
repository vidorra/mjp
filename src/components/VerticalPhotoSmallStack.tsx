'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Photo {
  id?: number;
  src: string;
  alt?: string;
}

interface VerticalPhotoSmallStackProps {
  photos: Photo[];
  containerHeight?: number;
}

const VerticalPhotoSmallStack: React.FC<VerticalPhotoSmallStackProps> = ({ photos, containerHeight = 1800 }) => {
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
      <div className="sticky top-0 w-full h-screen">
        <div className="relative w-full h-full">
          {photos.map((photo, index) => {
            const stackPosition = (photos.length + activeIndex - index) % photos.length;
            const zIndex = photos.length - stackPosition;
            
            let rotation = 0;
            let yPosition = 0;
            let xPosition = 0;
            let scale = 1;
            
            // Create stacked effect in top right and other positions
            if (stackPosition === 0) { // Top right front
              rotation = 8;
              yPosition = -25;
              xPosition = 45;
              scale = 1.32; // 1.2 * 1.1
            } else if (stackPosition === 1) { // Top right middle
              rotation = 12;
              yPosition = -26;
              xPosition = 48;
              scale = 1.265; // 1.15 * 1.1
            } else if (stackPosition === 2) { // Top right back
              rotation = 16;
              yPosition = -28;
              xPosition = 51;
              scale = 1.21; // 1.1 * 1.1
            } else if (stackPosition === 3) { // Bottom left
              rotation = -12;
              yPosition = 28;
              xPosition = -32;
              scale = 1.15;
            } else { // Top left
              rotation = -8;
              yPosition = -22;
              xPosition = -28;
              scale = 1.2;
            }
            
            const slideProgress = (scrollY * 2) % 1;
            const isSliding = Math.floor(scrollY * photos.length) % photos.length === index;
            
            if (isSliding) {
              const nextPosition = (stackPosition + 1) % photos.length;
              const nextRotation = nextPosition === 0 ? 0 : (nextPosition % 2 === 0 ? 15 : -15);
              const nextYPosition = nextPosition === 0 ? 0 : (nextPosition === 1 ? -10 : -15);
              const nextXPosition = nextPosition === 0 ? 0 : (nextPosition === 1 ? -20 : (nextPosition % 2 === 0 ? 25 : -25));
              const nextScale = nextPosition === 0 ? 0.9 : (nextPosition === 1 ? 0.7 : 0.6);
              
              rotation = rotation + (nextRotation - rotation) * slideProgress;
              yPosition = yPosition + (nextYPosition - yPosition) * slideProgress;
              xPosition = xPosition + (nextXPosition - xPosition) * slideProgress;
              scale = scale + (nextScale - scale) * slideProgress;
            }
            
            return (
              <div
                key={photo.id || index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-20vw',
                  marginTop: '-12vh',
                  maxWidth: '24vw',
                  maxHeight: '16vw',
                  borderRadius: '8px',
                  transform: `translate(${xPosition}vw, ${yPosition}vh) rotate(${rotation}deg) scale(${scale})`,
                  zIndex: zIndex,
                  transition: 'transform 0.3s ease-out',
                }}
                className=""  
              >
                <div className="relative w-[24vw] aspect-[3/2] overflow-hidden rounded-2xl shadow-xl border-white border-[4px]">
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

export default VerticalPhotoSmallStack;