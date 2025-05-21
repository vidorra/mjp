// Photography Personas - Reference-based personas that use the unified activities system

import { PersonTemplate } from './personData';

export interface ActivitySelections {
  categories?: string[];  // Categories to include all activities from
  activities?: string[];  // Specific activity IDs to include
}

export interface PhotographyPersona extends Omit<PersonTemplate, 'details'> {
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
  };
  activitySelections: ActivitySelections;
}

const photographyPersonas: Record<string, PhotographyPersona> = {
  'Instagram Model': {
    role: 'Instagram Model',
    age: '20s',
    build: 'athletic',
    clothing: 'trendy',
    expression: 'confident',
    details: {
      height: 'tall',
      specificHeight: true,
      weight: 'athletic weight',
      specificWeight: true
    },
    activitySelections: {
      categories: ['contentCreation'],
      activities: ['posing_product', 'taking_selfie', 'influencer_posing', 'lifestyle_content', 'brand_showcase']
    }
  },
  'Corporate Professional': {
    role: 'Professional',
    age: '30s',
    clothing: 'formal',
    expression: 'confident',
    details: {
      build: 'average build'
    },
    activitySelections: {
      categories: ['professional'],
      activities: ['presenting', 'laptop', 'leading_meeting', 'brainstorming', 'collaborating']
    }
  },
  'Fitness Enthusiast': {
    role: 'Athlete',
    age: '20s',
    build: 'athletic',
    clothing: 'casual',
    expression: 'determined',
    details: {
      specificBuildDetails: true
    },
    activitySelections: {
      categories: ['sports'],
      activities: ['athletic_actions', 'showing_determination', 'yoga_poses', 'exercise_movements']
    }
  },
  'Creative Artist': {
    role: 'Artist',
    age: '30s',
    clothing: 'casual',
    expression: 'contemplative',
    details: {
      build: 'average build'
    },
    activitySelections: {
      categories: ['creative'],
      activities: ['painting', 'sketching', 'artistic_expression', 'deep_contemplation']
    }
  },
  'Content Creator': {
    role: 'Content Creator',
    age: '20s',
    clothing: 'casual',
    expression: 'engaging',
    details: {
      build: 'average build'
    },
    activitySelections: {
      categories: ['contentCreation'],
      activities: ['speaking_to_camera', 'filming_content', 'tutorial_creation', 'product_review']
    }
  },
  'Business Executive': {
    role: 'Professional',
    age: '40s',
    clothing: 'formal',
    expression: 'confident',
    details: {
      build: 'average build'
    },
    activitySelections: {
      categories: ['professional'],
      activities: ['leading_meeting', 'presenting', 'consulting', 'problem_solving']
    }
  },
  'Casual Portrait': {
    role: 'Everyday Person',
    age: '30s',
    clothing: 'casual',
    expression: 'natural',
    details: {
      build: 'average build'
    },
    activitySelections: {
      categories: ['static', 'looking'],
      activities: ['standing', 'sitting', 'looking_camera', 'casual_stance']
    }
  }
};

// Helper function to get a description of a persona
export function getPersonaDescription(personaName: string): string {
  const persona = photographyPersonas[personaName];
  if (!persona) return '';
  
  return `${persona.age} ${persona.role} with ${persona.expression} expression, wearing ${persona.clothing} clothing`;
}

// Helper function to check if an activity is recommended for a persona
export function isPersonaRecommended(personaName: string, activityId: string): boolean {
  const persona = photographyPersonas[personaName];
  if (!persona || !persona.activitySelections) return false;
  
  // Check if activity is directly included
  if (persona.activitySelections.activities?.includes(activityId)) {
    return true;
  }
  
  // Check if activity's category is included
  // This would require knowing which category the activity belongs to
  // We would need to pass the full activities system to do this check
  
  return false;
}

export default photographyPersonas;