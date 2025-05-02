# Photo Stack Implementation Todo

## Files to Create/Modify

### 1. Install Required Dependencies
```bash
# Run in your project root directory
npm install framer-motion
```

### 2. Component File: `/components/VerticalPhotoStack.js`
Create this component file with the following content:

```jsx
'use client'; // Add this if using Next.js App Router

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const VerticalPhotoStack = ({ photos, containerHeight = 1800 }) => {
  const containerRef = useRef(null);
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
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
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
              scale = 1.15; // 15% larger than bottom photo
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
              const nextScale = nextPosition === 0 ? 1.15 : 1;
              
              // Interpolate between current and next position
              rotation = rotation + (nextRotation - rotation) * slideProgress;
              yPosition = yPosition + (nextYPosition - yPosition) * slideProgress;
              xPosition = xPosition + (nextXPosition - xPosition) * slideProgress;
              scale = scale + (nextScale - scale) * slideProgress;
            }
            
            return (
              <motion.div
                key={photo.id || index}
                animate={{
                  x: xPosition,
                  y: yPosition,
                  rotate: rotation,
                  scale: scale,
                  zIndex: zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-150px', // Half of width
                  marginTop: '-100px',  // Half of height
                }}
                className="shadow-xl"
              >
                <div className="relative w-96 h-64 overflow-hidden" style={{ borderRadius: '8px' }}>
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerticalPhotoStack;
```

### 3. Image Files: `/public/images/`
Upload two images to your project's public directory:
- `/public/images/photo1.jpg`
- `/public/images/photo2.jpg`

Make sure they have a 3:2 aspect ratio (e.g., 600x400 pixels) for best results.

### 4. Page Integration: Choose One Option Based on Your Next.js Setup

#### Option A: Pages Router (`/pages/index.js` or your target page)
```jsx
import Head from 'next/head';
import VerticalPhotoStack from '../components/VerticalPhotoStack';

export default function Home() {
  // Sample photo data
  const photos = [
    {
      id: 1,
      src: '/images/photo1.jpg', 
      alt: 'Art piece 1'
    },
    {
      id: 2,
      src: '/images/photo2.jpg', 
      alt: 'Art piece 2'
    }
  ];

  return (
    <>
      <Head>
        <title>Your Page Title</title>
        <meta name="description" content="Your page description" />
      </Head>
      
      <main>
        {/* Your header content here */}
        <section className="text-center pt-20 pb-8 px-4">
          <h1 className="text-5xl font-bold mb-8">
            A place to display your masterpiece.
          </h1>
        </section>
        
        {/* Photo stack section */}
        <VerticalPhotoStack photos={photos} containerHeight={1800} />
        
        {/* Your additional content here */}
      </main>
    </>
  );
}
```

#### Option B: App Router (`/app/page.js` or your target page)
```jsx
// app/page.js
import StackPhotoSection from './StackPhotoSection';

export default function Home() {
  return (
    <main>
      {/* Your header content here */}
      <section className="text-center pt-20 pb-8 px-4">
        <h1 className="text-5xl font-bold mb-8">
          A place to display your masterpiece.
        </h1>
      </section>
      
      {/* Photo stack section - using client component */}
      <StackPhotoSection />
      
      {/* Your additional content here */}
    </main>
  )
}
```

### 5. Client Component for App Router (if using Option B): `/app/StackPhotoSection.js`
```jsx
'use client';

import VerticalPhotoStack from '../components/VerticalPhotoStack';

export default function StackPhotoSection() {
  // Sample photo data
  const photos = [
    {
      id: 1,
      src: '/images/photo1.jpg', 
      alt: 'Art piece 1'
    },
    {
      id: 2,
      src: '/images/photo2.jpg', 
      alt: 'Art piece 2'
    }
  ];

  return <VerticalPhotoStack photos={photos} containerHeight={1800} />;
}
```

## Implementation Checklist

1. [ ] Install framer-motion dependency
2. [ ] Create VerticalPhotoStack.js component
3. [ ] Prepare and upload two 3:2 ratio images to /public/images/
4. [ ] Integrate component into your page (either Pages Router or App Router)
5. [ ] Test the scroll effect in development mode
6. [ ] Adjust the containerHeight value if needed
7. [ ] Make any styling adjustments to match your site's design

## Optional Customizations

- Adjust the rotation angle (-8° currently) to change how much the bottom photo is rotated
- Modify the position offsets to change how far the bottom photo is from the top one
- Change the scale value (1.15 currently) to adjust the size difference between photos
- Update the shadow styling for more or less pronounced shadow effects
- Customize the border-radius (8px currently) to match your design preferences
