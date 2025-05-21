'use client';

import React from 'react';

// Types
type CameraGear = {
  camera: string;
  lens: string;
  notes?: string;
};

// Camera recommendations data
const cameraRecommendations: { [key: string]: { [key: string]: CameraGear } } = {
  'portrait': {
    'extreme-close-up': {
      camera: 'Canon EOS R5',
      lens: 'MP-E 65mm f/2.8 1-5x Macro',
      notes: 'Extreme detail for eye/skin texture shots'
    },
    'close-up': {
      camera: 'Sony A7 IV',
      lens: '85mm f/1.4 GM',
      notes: 'Perfect for headshots with beautiful bokeh'
    },
    'close-up-alt': {
      camera: 'Canon EOS R5',
      lens: '85mm f/1.2L',
      notes: 'Superior bokeh for portraits'
    },
    'medium': {
      camera: 'Leica SL2',
      lens: '90mm f/2.5',
      notes: 'Classic portrait rendering'
    },
    'full': {
      camera: 'Canon EOS R6',
      lens: '24-70mm f/2.8L',
      notes: 'Great for full-body fashion shots'
    }
  },
  'product': {
    'extreme-close-up': {
      camera: 'Canon EOS R5',
      lens: 'MP-E 65mm f/2.8 Macro',
      notes: 'For extremely detailed product texture shots'
    },
    'close-up': {
      camera: 'Sony A7R V',
      lens: '90mm f/2.8 Macro G',
      notes: 'High resolution for product details'
    },
    'medium': {
      camera: 'Canon R5',
      lens: '24-105mm f/4L',
      notes: 'Versatile for various product sizes'
    }
  },
  'landscape': {
    'extreme-wide': {
      camera: 'Nikon D850',
      lens: '14-24mm f/2.8',
      notes: 'Ultra-wide for dramatic landscapes'
    },
    'wide': {
      camera: 'Sony A7R V',
      lens: '16-35mm f/2.8 GM',
      notes: 'Standard landscape setup'
    }
  },
  'street': {
    'wide': {
      camera: 'Fujifilm X-T5',
      lens: '16mm f/1.4',
      notes: 'Ultra-wide street scenes'
    },
    'medium': {
      camera: 'Leica Q2',
      lens: '28mm f/1.7 (Fixed)',
      notes: 'Classic street photography setup'
    }
  },
  'macro': {
    'extreme-close-up': {
      camera: 'Olympus OM-D E-M1X',
      lens: '60mm f/2.8 Macro',
      notes: 'Excellent macro performance'
    },
    'close-up': {
      camera: 'Canon EOS R5',
      lens: '100mm f/2.8L Macro',
      notes: 'Superior macro optics'
    }
  },
  'fashion': {
    'full': {
      camera: 'Hasselblad X2D 100C',
      lens: '90mm f/2.5',
      notes: 'Medium format for fashion'
    },
    'close-up': {
      camera: 'Fujifilm GFX 100S',
      lens: '110mm f/2',
      notes: 'High resolution for details'
    }
  },
  'cinematic': {
    'wide': {
      camera: 'Canon C70',
      lens: '24-70mm f/2.8 Cine',
      notes: 'Professional cinema camera'
    },
    'close-up': {
      camera: 'Sony FX9',
      lens: '50mm f/1.2 Cine',
      notes: 'Cinematic shallow focus'
    }
  },
  'architecture & interiors': {
    'wide': {
      camera: 'Canon EOS R5',
      lens: '16-35mm f/2.8L',
      notes: 'Wide angle for architecture'
    },
    'detail': {
      camera: 'Nikon Z7 II',
      lens: '105mm f/2.8 Macro',
      notes: 'Interior detail shots'
    },
    'building-exterior': {
      camera: 'Sony A7R V',
      lens: '24-70mm f/2.8 GM',
      notes: 'Versatile for architectural exteriors'
    }
  }
};

// Helper function to get camera recommendation
const getCameraRecommendation = (style: string, shotType: string, depthOption: string = ''): CameraGear => {
  const defaultGear: CameraGear = {
    camera: 'Sony A7 III',
    lens: '24-70mm f/2.8',
    notes: 'Versatile all-purpose setup'
  };

  // Depth-specific recommendations for wide shots
  const depthGear: { [key: string]: CameraGear } = {
    'foreground-detail': {
      camera: 'Nikon D850',
      lens: '24-70mm f/2.8',
      notes: 'Excellent for foreground detail while maintaining background context'
    },
    'depth-of-field': {
      camera: 'Sony A7R IV',
      lens: '70-200mm f/2.8 GM',
      notes: 'Perfect for graduated depth of field control'
    },
    'background-emphasis': {
      camera: 'Canon EOS R5',
      lens: '85mm f/1.2 L',
      notes: 'Superior background rendering with subject separation'
    }
  };

  // If it's a wide-type shot and has depth option, prioritize depth-specific gear
  if (['extreme-wide', 'wide', 'full'].includes(shotType) && depthOption) {
    return depthGear[depthOption] || defaultGear;
  }

  // Otherwise use style and shot type specific recommendations
  const styleRecs = cameraRecommendations[style];
  if (!styleRecs) return defaultGear;

  const shotRec = styleRecs[shotType];
  if (!shotRec) {
    const firstShotType = Object.keys(styleRecs)[0];
    return styleRecs[firstShotType] || defaultGear;
  }

  return shotRec;
};

// Helper function to get depth description
const getDepthDescription = (depthOption: string): string => {
  switch (depthOption) {
    case 'foreground-detail':
      return 'with detailed focus in the foreground';
    case 'depth-of-field':
      return 'with graduated depth of field from front to back';
    case 'background-emphasis':
      return 'with emphasis on the background and soft foreground';
    default:
      return '';
  }
};

export { getCameraRecommendation, getDepthDescription, cameraRecommendations, type CameraGear };