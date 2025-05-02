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
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        <div className="relative w-full h-full max-w-[85vw] 2xl:max-w-[1600px] mx-auto">
          {photos.map((photo, index) => {
            const stackPosition = (photos.length + activeIndex - index) % photos.length;
            const zIndex = photos.length - stackPosition;
            
            let rotation = 0;
            let yPosition = 0;
            let xPosition = 0;
            let scale = 1;
            
            if (stackPosition === 0) {
              rotation = 0;
              yPosition = 0;
              xPosition = 0;
              scale = 1.15;
            } else {
              rotation = -8;
              yPosition = 5;
              xPosition = -14.6;
            }
            
            const slideProgress = (scrollY * 2.5) % 1; // 25% faster
            const currentPhotoIndex = Math.floor(scrollY * photos.length);
            const isSliding = index === currentPhotoIndex % photos.length;
            const isNext = index === (currentPhotoIndex + 1) % photos.length;
            
            if (isSliding || isNext) {
              // Custom easing curve for smoother transitions
              const easeOutBack = t => {
                const c1 = 1.70158;
                const c3 = c1 + 1;
                return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
              };
              const easedProgress = easeOutBack(slideProgress);
              
              if (isNext) {
                // Next photo: stacked -> center
                rotation = -8 + (0 - -8) * easedProgress;
                yPosition = 5 + (0 - 5) * easedProgress;
                xPosition = -14.6 + (0 - -14.6) * easedProgress;
                scale = 1 + (1.15 - 1) * easedProgress;
              } else {
                // Current photo: center -> stacked
                rotation = 0 + (-8 - 0) * easedProgress;
                yPosition = 0 + (5 - 0) * easedProgress;
                xPosition = 0 + (-14.6 - 0) * easedProgress;
                scale = 1.15 + (1 - 1.15) * easedProgress;
              }
            }
            
            return (
              <div
                key={photo.id || index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: stackPosition === 0 ? '-7.3vw' : '-14.6vw',
                  marginTop: '-25vh',
                  maxWidth: '760px',
                  maxHeight: '506px',
                  transform: `translate(${xPosition}vw, ${yPosition}vh) rotate(${rotation}deg) scale(${scale})`,
                  zIndex: zIndex,
                  transition: 'transform 0.3s ease-out',
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