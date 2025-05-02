'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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
      <div className="sticky top-0 w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-4xl mx-auto">
          {photos.map((photo, index) => {
            // Calculate the position in the stack (0 = top, 1 = bottom)
            const stackPosition = (photos.length + activeIndex - index) % photos.length;
            const zIndex = photos.length - stackPosition;
            
            // Define specific transforms for each position in the stack
            let rotation = 0;
            let yPosition = 0;
            let xPosition = 0;
            let scale = 1;
            
            if (stackPosition === 0) {
              // Top photo - no rotation, centered, 15% larger
              rotation = 0;
              yPosition = 0;
              xPosition = 0;
              scale = 1.25; // 25% larger than bottom photo
            } else {
              // Bottom photo - slight counter-clockwise rotation, below
              rotation = -8;
              yPosition = 30; // Move down more for vertical orientation
              xPosition = -20; // Slight offset to the left
            }
            
            // Add sliding animation when a photo is about to move positions
            const slideProgress = scrollY * 2 % 1; // Create a cyclic animation
            const isSliding = Math.floor(scrollY * photos.length) % photos.length === index;
            
            if (isSliding) {
              // Calculate next position
              const nextPosition = (stackPosition + 1) % photos.length;
              const nextRotation = nextPosition === 0 ? 0 : -8;
              const nextYPosition = nextPosition === 0 ? 0 : 30;
              const nextXPosition = nextPosition === 0 ? 0 : -20;
              const nextScale = nextPosition === 0 ? 1.25 : 1;
              
              // Interpolate between current and next position
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
                  marginLeft: '-300px', // Half of width
                  marginTop: '-200px',  // Half of height
                  transform: `translate(${xPosition}px, ${yPosition}px) rotate(${rotation}deg) scale(${scale})`,
                  zIndex: zIndex,
                  transition: 'transform 0.3s ease-out',
                }}
                className="shadow-xl"
              >
                <div className="relative w-[720px] h-[480px] overflow-hidden" style={{ borderRadius: '8px' }}>
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