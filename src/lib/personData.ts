// Person data including roles, templates, and other person-related information

// Role options for the Person Builder
export const roleOptions = [
  'Professional', 
  'Athlete', 
  'Artist', 
  'Student',
  'Instagram Model',
  'Influencer',
  'Content Creator',
  'Everyday Person'
];

// Specialized templates for different types of people
export interface PersonTemplate {
  role: string;
  age: string;
  build?: string;
  clothing: string;
  expression: string;
  details: {
    height?: string;
    specificHeight?: boolean;
    weight?: string;
    specificWeight?: boolean;
    build?: string;
    specificBuildDetails?: boolean;
  }
}

export const personTemplates: Record<string, PersonTemplate> = {
  'Instagram Model': {
    role: 'Instagram Model',
    age: '20s',
    build: 'athletic',
    clothing: 'trendy',
    expression: 'confident',
    details: {
      height: 'tall',
      specificHeight: true, // Enable specific height field
      weight: 'athletic weight',
      specificWeight: true  // Enable specific weight field
    }
  },
  'Corporate Professional': {
    role: 'Professional',
    age: '30s',
    clothing: 'formal',
    expression: 'confident',
    details: {
      build: 'average build'
    }
  },
  'Fitness Enthusiast': {
    role: 'Athlete',
    age: '20s',
    build: 'athletic',
    clothing: 'casual',
    expression: 'determined',
    details: {
      specificBuildDetails: true // Enable detailed fitness level description
    }
  },
  'Creative Artist': {
    role: 'Artist',
    age: '30s',
    clothing: 'casual',
    expression: 'contemplative',
    details: {
      build: 'average build'
    }
  }
};

// Facial features options
export const facialFeatures = [
  'sharp features', 
  'soft features', 
  'angular jawline', 
  'round face',
  'high cheekbones', 
  'prominent nose', 
  'delicate features', 
  'strong brow'
];

// Facial hair options (for male)
export const facialHair = [
  'clean-shaven', 
  'stubble', 
  'full beard', 
  'goatee', 
  'mustache', 
  'soul patch',
  'light beard',
  'heavy beard',
  "5 o'clock shadow"
];

// Height options
export const heightOptions = [
  'tall', 
  'average height', 
  'short', 
  'very tall', 
  'petite'
];

// Weight options
export const weightOptions = [
  'average weight', 
  'athletic weight', 
  'fuller figure', 
  'slender'
];