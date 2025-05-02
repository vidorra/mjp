// types/photography.ts
export type CameraAngle = {
  value: string;          // Primary value used in the code
  label: string;         // Display label in the UI
  variants: string[];    // Different ways this might appear in text
  suggestedFor?: string[];
  description?: string;
};
  
export const cameraAngles: CameraAngle[] = [
  // Essential Angles (Most commonly used)
  { 
    value: 'front-view', 
    label: 'Front View',
    variants: ['frontview', 'front view', 'front-view'],
    suggestedFor: ['close-up', 'extreme-close-up', 'portrait', 'product', 'macro'],
    description: 'Direct, straightforward view of the subject'
  },
  { 
    value: 'side-view', 
    label: 'Side View',
    variants: ['sideview', 'side view', 'side-view'],
    suggestedFor: ['close-up', 'extreme-close-up', 'macro', 'portrait', 'product'],
    description: 'Profile perspective, showing the side of the subject'
  },
  { 
    value: 'three-quarter', 
    label: 'Three-Quarter View',
    variants: ['threequarter', 'three quarter', 'three-quarter', 'three quarter view'],
    suggestedFor: ['close-up', 'portrait', 'product', 'medium'],
    description: 'Angled view showing both front and side aspects'
  },
  { 
    value: 'eye-level', 
    label: 'Eye Level',
    variants: ['eyelevel', 'eye level', 'eye-level'],
    suggestedFor: ['close-up', 'extreme-close-up', 'portrait', 'product', 'medium'],
    description: 'Natural perspective at subject\'s eye level'
  },
  
  // Dynamic Angles (For specific creative effects)
  { 
    value: 'high-angle', 
    label: 'High Angle',
    variants: ['highangle', 'high angle', 'high-angle', 'high shot'],
    suggestedFor: ['landscape', 'wide', 'full', 'product'],
    description: 'Shot from above looking down'
  },
  { 
    value: 'low-angle', 
    label: 'Low Angle',
    variants: ['lowangle', 'low angle', 'low-angle', 'low shot'],
    suggestedFor: ['architecture', 'portrait', 'street', 'product'],
    description: 'Shot from below looking up'
  },
  { 
    value: 'birds-eye', 
    label: "Bird's Eye View",
    variants: ['birdseye', 'birds eye', 'birds-eye', 'birds eye view', 'bird eye', 'birds-eye view'],
    suggestedFor: ['landscape', 'architecture', 'wide', 'extreme-wide'],
    description: 'Directly overhead view'
  },
  
  // Specialty Angles (For specific situations)
  { 
    value: 'over-shoulder', 
    label: 'Over The Shoulder',
    variants: ['overshoulder', 'over shoulder', 'over-shoulder', 'over the shoulder', 'shoulder shot'],
    suggestedFor: ['close-up', 'medium', 'portrait'],
    description: 'Shot from behind one subject looking at another'
  },
  { 
    value: 'dutch-angle', 
    label: 'Dutch Angle',
    variants: ['dutchangle', 'dutch angle', 'dutch-angle', 'dutch tilt', 'dutch shot'],
    suggestedFor: ['close-up', 'medium', 'portrait', 'street'],
    description: 'Tilted camera angle for dramatic effect'
  }
];
  


export const getSuggestedAngles = (shotType: string) => {
  // Normalize the shot type for comparison
  const normalizedShotType = shotType.toLowerCase().replace('-', ' ');
  
  // For terms like "sideview" vs "side view"
  const compound = normalizedShotType.replace(' ', '');

  const suggested = cameraAngles.filter(angle => {
    const normalizedAngle = angle.value.toLowerCase().replace('-', '');
    return angle.suggestedFor?.includes(normalizedShotType) ||
            normalizedAngle === compound;
  });
  
  // Get the angles that weren't suggested
  const others = cameraAngles.filter(angle => !suggested.includes(angle));
  
  console.log('Shot type:', normalizedShotType);
  console.log('Suggested angles:', suggested.map(a => a.label));

  return { suggested, others };
};