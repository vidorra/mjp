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
            
            // Define center and stacked positions
            const centerPosition = { rotation: 0, y: 0, x: 0, scale: 1.15 };
            const stackedPosition = { rotation: -8, y: 5, x: -7.3, scale: 1 };
            
            // Set initial positions
            if (stackPosition === 0) {
              rotation = centerPosition.rotation;
              yPosition = centerPosition.y;
              xPosition = centerPosition.x;
              scale = centerPosition.scale;
            } else {
              rotation = stackedPosition.rotation;
              yPosition = stackedPosition.y;
              xPosition = stackedPosition.x;
              scale = stackedPosition.scale;
            }
            
            const slideProgress = (scrollY * 2.5) % 1; // 25% faster
            const currentPhotoIndex = Math.floor(scrollY * photos.length);
            const isSliding = index === currentPhotoIndex % photos.length;
            const isNext = index === (currentPhotoIndex + 1) % photos.length;
            
            if (isSliding || isNext) {
              // Smooth easing function
              const easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
              const easedProgress = easeInOutCubic(slideProgress);
              
              if (isNext) {
                // Next photo: stacked -> center
                rotation = stackedPosition.rotation + (centerPosition.rotation - stackedPosition.rotation) * easedProgress;
                yPosition = stackedPosition.y + (centerPosition.y - stackedPosition.y) * easedProgress;
                xPosition = stackedPosition.x + (centerPosition.x - stackedPosition.x) * easedProgress;
                scale = stackedPosition.scale + (centerPosition.scale - stackedPosition.scale) * easedProgress;
              } else {
                // Current photo: center -> stacked
                rotation = centerPosition.rotation + (stackedPosition.rotation - centerPosition.rotation) * easedProgress;
                yPosition = centerPosition.y + (stackedPosition.y - centerPosition.y) * easedProgress;
                xPosition = centerPosition.x + (stackedPosition.x - centerPosition.x) * easedProgress;
                scale = centerPosition.scale + (stackedPosition.scale - centerPosition.scale) * easedProgress;
              }
            }
            
            return (
              <div
                key={photo.id || index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: stackPosition === 0 ? '-5vw' : '-10vw',
                  marginTop: '-25vh',
                  maxWidth: '760px',
                  maxHeight: '506px',
                  transform: `translate(${xPosition}vw, ${yPosition}vh) rotate(${rotation}deg) scale(${scale})`,
                  zIndex: zIndex,
                  transition: 'transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
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