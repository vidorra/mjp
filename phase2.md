# Photography Prompt Tool: Complete Enhancement Guide

## 🎯 Executive Summary

This guide provides a step-by-step plan to enhance the photography prompt tool from its current state to a professional-grade photography direction assistant. The implementation is divided into three phases, starting with improvements to existing functionality and progressively adding advanced features.

---

## 📋 Current Tool Assessment

### ✅ What's Working Well
- Object categories (Person, Animal, Product, Architecture, Nature)
- Basic photography styles (Product, Portrait, Landscape, Street, Macro)
- Shot types with depth options
- Camera angles with smart suggestions
- Advanced settings (image size, stylization, variety)

### ❌ Critical Gaps Identified
- No person description builder (age, ethnicity, features)
- Missing activities and actions
- Limited lighting options (no shadow control)
- No composition guidance
- UX could overwhelm users with new features

---

# 🚀 Implementation Phases

## Phase 1: Foundation Enhancements ✅ COMPLETED
*Goal: Improve existing features without major UX disruption*

### 1.1 Lighting System Enhancement ✅
- Extended lighting dropdown with shadow control options
- Added secondary dropdowns for lighting quality and direction
- Integrated shadow descriptors in prompt generation

### 1.2 Photography Style Expansion ✅
- Added Cinematic, Editorial, Documentary styles
- Updated style-based suggestions for shot types and angles
- Created style-specific camera recommendations

### 1.3 Basic/Advanced Mode Implementation ✅
- Added toggle switch at top of interface
- Defined content visibility for each mode
- Maintained all current functionality in Basic mode

---

## Phase 1 Additions: Quick Wins ✅ COMPLETED
*Goal: Add quick enhancements based on new prompt analysis*

### 1A.1 Interior Architecture Category ✅
- Added "Architecture & Interiors" category with unified subcategories
- Created interior-specific style suggestions
- Added architectural photography camera recommendations

### 1A.2 Expanded Camera & Lens Database ✅
- Enhanced automatic camera/lens selection system
- Added professional cinema cameras for cinematic style
- Added medium format options for high-end fashion/portrait work

### 1A.2 Enhanced Body Specifications (1 week)
**Extend existing Person Builder with gender-aware options:**
```typescript
const bodySpecifications = {
  build: ['slim', 'athletic', 'average', 'muscular', 'petite', 'curvy', 'stocky', 'lean'],
  height: ['tall', 'average height', 'short', 'very tall', 'petite', 'specific height (e.g., 1.85m)'],
  details: ['detailed skin texture', 'smooth skin', 'weathered skin', 'glowing skin', 'sun-kissed skin', 'porcelain skin']
};

// Gender-specific physical features
const physicalFeaturesByGender = {
  male: {
    hair: ['short dark hair', 'buzz cut', 'quiff', 'man bun', 'bald', 'receding hairline', 'beard', 'mustache', 'goatee', 'clean-shaven', 'salt-and-pepper beard', 'full beard', 'stubble'],
    build: ['muscular', 'athletic', 'lean', 'stocky', 'slim', 'broad-shouldered', 'tall', 'average build']
  },
  female: {
    hair: ['long blonde hair', 'short bob', 'curly hair', 'straight hair', 'pixie cut', 'braided hair', 'updo', 'ponytail', 'loose waves', 'bangs', 'shoulder-length', 'wavy hair'],
    build: ['slim', 'athletic', 'curvy', 'petite', 'tall', 'average build', 'hourglass', 'pear-shaped']
  },
  person: {
    hair: ['short hair', 'long hair', 'curly hair', 'straight hair', 'natural hair', 'styled hair', 'colorful hair'],
    build: ['slim', 'athletic', 'average', 'tall', 'short', 'unique build']
  }
};

// Gender-specific clothing options
const clothingByGender = {
  male: {
    casual: ['t-shirt', 'jeans', 'hoodie', 'chinos', 'polo shirt', 'sweater', 'casual shirt'],
    formal: ['suit', 'blazer', 'dress shirt', 'tie', 'tuxedo', 'formal pants', 'vest'],
    accessories: ['watch', 'cap', 'sunglasses', 'belt', 'cufflinks']
  },
  female: {
    casual: ['dress', 'jeans', 'blouse', 'skirt', 'sweater', 'cardigan', 'casual top'],
    formal: ['evening gown', 'business suit', 'cocktail dress', 'formal blouse', 'blazer'],
    accessories: ['jewelry', 'handbag', 'scarf', 'heels', 'earrings', 'necklace']
  },
  person: {
    casual: ['clothing', 'comfortable outfit', 'casual wear', 'everyday clothes'],
    formal: ['formal attire', 'professional clothing', 'elegant outfit'],
    accessories: ['accessories', 'personal items']
  }
};
```

### 1A.4 Expanded Camera & Lens Database (1-2 weeks)
**Enhance existing automatic camera/lens selection system:**

**Current System (Keep Intact):**
- User selects Photography Style + Shot Type
- Tool automatically recommends appropriate Camera + Lens
- Maintains professional recommendations without requiring camera knowledge

**Enhanced Camera Options:**
```typescript
const expandedCameraRecommendations = {
  portrait: {
    'extreme-close-up': {
      camera: 'Canon EOS R5',
      lens: 'MP-E 65mm f/2.8 1-5x Macro',
      notes: 'Extreme detail for eye/skin texture shots'
    },
    'close-up': {
      camera: 'Sony A7 IV',
      lens: '85mm f/1.4 GM',  // Current
      notes: 'Perfect for headshots'
    },
    'close-up-alt': {
      camera: 'Canon EOS R5',  // NEW
      lens: '85mm f/1.2L',     // NEW  
      notes: 'Superior bokeh for portraits'
    },
    'medium': {
      camera: 'Leica SL2',     // NEW
      lens: '90mm f/2.5',      // NEW
      notes: 'Classic portrait rendering'
    }
  },
  fashion: {  // NEW STYLE
    'full': {
      camera: 'Hasselblad X2D 100C',  // NEW
      lens: '90mm f/2.5',             // NEW
      notes: 'Medium format for fashion'
    },
    'close-up': {
      camera: 'Fujifilm GFX 100S',    // NEW
      lens: '110mm f/2',              // NEW
      notes: 'High resolution for details'
    }
  },
  cinematic: {  // NEW STYLE
    'wide': {
      camera: 'Canon C70',           // NEW
      lens: '24-70mm f/2.8 Cine',    // NEW
      notes: 'Professional cinema camera'
    },
    'close-up': {
      camera: 'Sony FX9',            // NEW
      lens: '50mm f/1.2 Cine',       // NEW
      notes: 'Cinematic shallow focus'
    }
  },
  interior: {  // NEW STYLE
    'wide': {
      camera: 'Canon EOS R5',
      lens: '16-35mm f/2.8L',        // Enhanced
      notes: 'Wide angle for architecture'
    },
    'detail': {
      camera: 'Nikon Z7 II',         // NEW
      lens: '105mm f/2.8 Macro',     // NEW
      notes: 'Interior detail shots'
    }
  },
  street: {
    'medium': {
      camera: 'Leica Q2',           // Current
      lens: '28mm f/1.7 (Fixed)',   // Current
      notes: 'Classic street setup'
    },
    'wide': {
      camera: 'Fujifilm X-T5',      // NEW
      lens: '16mm f/1.4',           // NEW
      notes: 'Ultra-wide street scenes'
    }
  },
  macro: {
    'extreme-close-up': {
      camera: 'Olympus OM-D E-M1X',  // Current
      lens: '60mm f/2.8 Macro',      // Current
      notes: 'Excellent macro performance'
    },
    'close-up': {
      camera: 'Canon EOS R5',        // NEW
      lens: '100mm f/2.8L Macro',    // NEW
      notes: 'Superior macro optics'
    }
  }
};

// Professional Cinema Cameras (for cinematic style)
const cinemaCameras = [
  'ARRI Alexa Mini', 'RED V-Raptor', 'Sony FX9', 
  'Canon C300 Mark III', 'Blackmagic URSA'
];

// High-End Still Cameras  
const professionalCameras = [
  'Hasselblad X2D 100C', 'Fujifilm GFX 100S', 'Leica SL2',
  'Canon EOS R5', 'Sony A7R V', 'Nikon Z9'
];
```

**Implementation Steps:**
1. **Expand camera database** while maintaining current automatic selection
2. **Add style-specific cameras** (cinematic, fashion, interior)
3. **Include professional cinema equipment** for cinematic style
4. **Add medium format options** for high-end fashion/portrait work
5. **Maintain recommendation logic** - user still just selects style + shot type

---

## Phase 2: Core New Features
*Goal: Implement critical missing components*

### 2.1 Person Builder Module (3-4 weeks)
**New Component:** `PersonBuilder.tsx` - **Separate Card Implementation**

**Restructured Person Categories:**
```typescript
// Update Person subcategories to be gender-based
const personSubcategories = [
  'Male', 
  'Female', 
  'Other', // With custom field for specification
  'Group'
];
```

**Enhanced Structure with Role Selection:**
```typescript
const personBuilder = {
  // Moved from subcategories to Person Builder
  role: {
    options: [
      'Professional', 
      'Athlete', 
      'Artist', 
      'Student',
      'Instagram Model', // NEW
      'Influencer',      // NEW
      'Content Creator',  // NEW
      'Everyday Person'   // NEW
    ]
  },
  demographics: {
    age: ['young', 'teens', '20s', '30s', '40s', '50s', '60s', '70s+', 'elderly'],
    ethnicity: [
      'Asian', 'African', 'European', 'Latin', 'Middle Eastern', 'Native American',
      'Pacific Islander', 'Mixed Ethnicity', 'South Asian', 'Southeast Asian', 
      'East Asian', 'Scandinavian', 'Mediterranean', 'Caribbean'
    ]
    // Gender now handled at subcategory level
  },
  physicalFeatures: {
    // Gender-specific options loaded dynamically based on gender selection
    hair: {
      male: [
        'short dark hair', 'buzz cut', 'quiff', 'man bun', 'bald', 'receding hairline', 
        'short blonde hair', 'short brown hair', 'crew cut', 'side part', 
        'pompadour', 'faded sides', 'spiky hair', 'curly short hair'
      ],
      female: [
        'long blonde hair', 'short bob', 'curly hair', 'straight hair', 'pixie cut', 
        'braided hair', 'updo', 'ponytail', 'loose waves', 'bangs', 
        'shoulder-length', 'wavy hair', 'long dark hair', 'burgundy hair'
      ],
      other: [
        'short hair', 'long hair', 'curly hair', 'straight hair', 'natural hair', 
        'styled hair', 'colorful hair', 'unique hairstyle', 'asymmetrical cut'
      ]
    },
    facialHair: { // Male-specific
      male: [
        'clean-shaven', 'stubble', 'full beard', 'goatee', 'mustache', 
        'soul patch', 'light beard', 'heavy beard', '5 o'clock shadow'
      ]
    },
    eyeColor: [
      'brown eyes', 'blue eyes', 'green eyes', 'hazel eyes', 
      'amber eyes', 'gray eyes', 'dark eyes'
    ],
    skinTone: [
      'pale skin', 'fair skin', 'warm skin', 'olive skin', 'dark skin', 
      'bronze skin', 'golden skin', 'porcelain skin', 'sun-kissed skin',
      'weathered skin', 'glowing skin', 'freckled skin'
    ],
    facialFeatures: [
      'sharp features', 'soft features', 'angular jawline', 'round face',
      'high cheekbones', 'prominent nose', 'delicate features', 'strong brow'
    ],
    build: {
      male: [
        'muscular', 'athletic', 'lean', 'stocky', 'slim', 'broad-shouldered', 
        'tall', 'average build', 'heavy-set', 'fit', 'slender'
      ],
      female: [
        'slim', 'athletic', 'curvy', 'petite', 'tall', 'average build', 
        'hourglass', 'pear-shaped', 'fit', 'slender', 'plus-size'
      ],
      other: [
        'slim', 'athletic', 'average', 'tall', 'short', 
        'unique build', 'muscular', 'toned'
      ]
    },
    bodySpecs: {
      height: ['tall', 'average height', 'short', 'very tall', 'petite'],
      specificHeight: 'Custom field (e.g., 1.85m)',
      weight: ['average weight', 'athletic weight', 'fuller figure', 'slender'],
      specificWeight: 'Custom field (e.g., 75kg)'
    }
  },
  expressions: [
    'serene', 'confident', 'smiling', 'contemplative', 'passionate', 'focused',
    'mysterious', 'joyful', 'intense', 'peaceful', 'determined', 'gentle',
    'fierce', 'vulnerable', 'wise', 'playful', 'melancholic', 'radiant'
  ],
  clothing: {
    // Gender-specific clothing loaded dynamically
    styles: {
      all: ['casual', 'formal', 'streetwear', 'vintage', 'contemporary', 'traditional', 'bohemian', 'minimalist'],
      male: {
        casual: ['t-shirt', 'jeans', 'hoodie', 'chinos', 'polo shirt', 'sweater', 'casual shirt'],
        formal: ['suit', 'blazer', 'dress shirt', 'tie', 'tuxedo', 'formal pants', 'vest'],
        accessories: ['watch', 'cap', 'sunglasses', 'belt', 'cufflinks']
      },
      female: {
        casual: ['dress', 'jeans', 'blouse', 'skirt', 'sweater', 'cardigan', 'casual top'],
        formal: ['evening gown', 'business suit', 'cocktail dress', 'formal blouse', 'blazer'],
        accessories: ['jewelry', 'handbag', 'scarf', 'heels', 'earrings', 'necklace']
      },
      other: {
        casual: ['clothing', 'comfortable outfit', 'casual wear', 'everyday clothes'],
        formal: ['formal attire', 'professional clothing', 'elegant outfit'],
        accessories: ['accessories', 'personal items']
      }
    },
    descriptors: ['fitted', 'loose', 'tailored', 'oversized', 'flowing', 'structured', 'layered']
  }
};
```

**Specialized Templates:**
```typescript
const personTemplates = {
  'Instagram Model': {
    role: 'Instagram Model',
    bodySpecs: {
      height: 'tall',
      specificHeight: true, // Enable specific height field
      weight: 'athletic weight',
      specificWeight: true  // Enable specific weight field
    },
    clothing: {
      styles: ['trendy', 'fashionable', 'contemporary'],
      descriptors: ['stylish', 'on-trend', 'carefully curated']
    },
    activities: ['posing with product', 'lifestyle content creation', 'brand showcase'],
    expressions: ['confident', 'engaging', 'photogenic']
  },
  'Corporate Professional': {
    role: 'Professional',
    clothing: {
      styles: ['formal', 'business casual'],
      items: ['suit', 'blazer', 'business attire']
    },
    activities: ['presenting', 'business meeting', 'working on laptop'],
    expressions: ['confident', 'focused', 'attentive']
  },
  'Fitness Enthusiast': {
    role: 'Athlete',
    bodySpecs: {
      build: 'athletic',
      specificBuildDetails: true // Enable detailed fitness level description
    },
    clothing: {
      styles: ['athletic wear', 'fitness apparel'],
      items: ['workout clothes', 'sports gear']
    },
    activities: ['exercising', 'running', 'weightlifting'],
    expressions: ['determined', 'energetic', 'focused']
  }
};
```

**UX Implementation - Separate Card Design:**
```typescript
// Person Builder as separate card alongside main tool
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <Card className="person-builder-card">
    <CardHeader>
      <CardTitle>Person Builder</CardTitle>
      <CardDescription>Create detailed person descriptions</CardDescription>
    </CardHeader>
    <CardContent>
      {/* This now shows options based on chosen gender subcategory */}
      <PersonBuilderContent gender={selectedSubcategory} />
      
      {/* For "Other" gender, show custom input field */}
      {selectedSubcategory === 'Other' && (
        <Input 
          placeholder="Specify gender identity" 
          onChange={(e) => setCustomGender(e.target.value)}
        />
      )}
      
      {/* Show specialized templates */}
      <TemplateSelector 
        templates={personTemplates} 
        onSelect={applyTemplate}
      />
    </CardContent>
  </Card>
  
  <Card className="prompt-builder-card">
    <CardHeader>
      <CardTitle>Photography Settings</CardTitle>
    </CardHeader>
    <CardContent>
      <PromptBuilderContent />
    </CardContent>
  </Card>
</div>
```

**Implementation Steps:**
1. Update Person subcategories to be gender-based (Male, Female, Other, Group)
2. Create PersonBuilder as a **separate card** next to main tool
3. Move professional roles (Professional, Athlete, etc.) into the Person Builder
4. Implement **gender-aware dynamic loading** of hair, facial hair, clothing, and build options
5. Add **specialized templates** for common photography personas (Instagram Model, etc.)
6. Add **custom field option** for "Other" gender selection
7. Include **body specification fields** with optional precise measurements

### 2.2 Activities & Actions Module (2-3 weeks)
**Enhanced Component:** `ActivitiesBuilder.tsx`

**Comprehensive Activity Structure:**
```typescript
const activitiesOptions = {
  static: [
    'standing confidently', 'sitting relaxed', 'leaning against wall', 
    'posing elegantly', 'arms crossed', 'hands in pockets', 'casual stance'
  ],
  looking: [
    'looking at camera', 'gazing upward', 'looking away', 'staring intensely',
    'glancing over shoulder', 'looking down thoughtfully', 'eyes closed',
    'profile view', 'side glance', 'direct eye contact'
  ],
  hands: [
    'holding phone', 'holding coffee', 'gesturing', 'touching face',
    'adjusting hair', 'pointing', 'clapping', 'writing', 'typing',
    'holding objects', 'hands clasped', 'finger to lips'
  ],
  social: [
    'laughing', 'talking', 'dancing', 'hugging', 'shaking hands',
    'having conversation', 'networking', 'celebrating', 'cheering',
    'group interaction', 'intimate conversation'
  ],
  daily: [
    'drinking coffee', 'reading', 'working', 'eating', 'cooking',
    'cleaning', 'organizing', 'relaxing', 'stretching', 'morning routine',
    'evening routine', 'self-care activities'
  ],
  movement: [
    'walking', 'running', 'jumping', 'crossing street', 'climbing stairs',
    'dancing', 'stretching', 'yoga poses', 'exercise movements',
    'athletic actions', 'graceful movement'
  ],
  professional: [
    'presenting', 'teaching', 'mentoring', 'writing', 'designing',
    'analyzing', 'consulting', 'leading meeting', 'brainstorming',
    'problem solving', 'collaborating', 'public speaking'
  ],
  creative: [
    'painting', 'sketching', 'playing instruments', 'singing', 'sculpting',
    'photography', 'writing creatively', 'crafting', 'designing',
    'performing arts', 'digital creation'
  ],
  sports: [
    'playing soccer', 'tennis', 'basketball', 'cycling', 'swimming',
    'yoga', 'pilates', 'weightlifting', 'martial arts', 'rock climbing',
    'skateboarding', 'surfing', 'skiing'
  ],
  contentCreation: [
    'speaking to camera', 'taking selfie', 'live streaming', 'filming content',
    'podcast recording', 'product review', 'tutorial creation',
    'influencer posing', 'behind-the-scenes', 'reaction videos'
  ],
  emotional: [
    'celebrating victory', 'deep contemplation', 'expressing joy',
    'showing determination', 'peaceful meditation', 'artistic expression',
    'moment of realization', 'genuine laughter', 'quiet reflection'
  ]
};
```

### 2.3 Social Media & Content Creation Module (2 weeks)
**New Component:** `ContentCreationBuilder.tsx`

**Structure:**
```typescript
const contentCreationOptions = {
  scenarios: ['Instagram modeling', 'TikTok content', 'YouTube presentation', 'Live streaming'],
  specifications: ['height/weight details', 'athletic measurements', 'model specifications'],
  poses: ['confident influencer poses', 'casual content creator', 'professional presenter'],
  equipment: ['smartphone camera', 'ring light setup', 'professional equipment']
};
```

### 2.4 Live Prompt Preview (1 week)
**Implementation Steps:**
1. Add preview panel that updates in real-time
2. Show current prompt as user makes selections
3. Highlight which parts come from which sections
4. Add copy-to-clipboard functionality

---

## Phase 3: Advanced Features & Specialization
*Goal: Professional-grade capabilities and specialized photography types*

### 3.1 Composition Rules (2 weeks)
**New Section:**
```typescript
const compositionRules = {
  rules: ['Rule of thirds', 'Leading lines', 'Symmetry', 'Golden ratio'],
  spacing: ['Negative space', 'Tight crop', 'Breathing room'],
  depth: ['Layered composition', 'Foreground focus', 'Background separation'],
  perspectives: ['Overhead view', 'Low angle', 'Eye level', 'Birds-eye view'] // NEW
};
```

### 3.2 Enhanced Environment & Context (3-4 weeks)
**Comprehensive Environment Structure:**
```typescript
const environmentOptions = {
  indoor: [
    'studio', 'coffee shop', 'bathroom', 'living room', 'bedroom', 'kitchen',
    'office', 'library', 'gym', 'restaurant', 'hotel lobby', 'art gallery',
    'museum', 'shopping mall', 'home office', 'coworking space', 'bar',
    'luxury apartment', 'minimalist interior', 'traditional home', 'loft'
  ],
  outdoor: [
    'natural setting', 'urban street', 'garden', 'beach', 'park', 'rooftop',
    'city intersection', 'countryside', 'forest', 'mountain', 'desert',
    'lakeside', 'riverside', 'downtown', 'suburb', 'industrial area',
    'bridge', 'plaza', 'marketplace', 'festival ground'
  ],
  architectural: [
    'modern building', 'heritage architecture', 'glass facade', 'brick building',
    'concrete structure', 'steel and glass', 'art deco building', 'gothic cathedral',
    'minimalist architecture', 'brutalist design', 'traditional structure',
    'industrial architecture', 'residential complex', 'commercial building'
  ],
  timeWeather: [
    'dawn', 'sunrise', 'morning', 'midday', 'afternoon', 'sunset', 'twilight',
    'night', 'misty morning', 'rainy day', 'sunny day', 'overcast sky',
    'stormy weather', 'snowy conditions', 'foggy atmosphere', 'clear sky',
    'dramatic clouds', 'golden hour', 'blue hour', 'harsh sunlight'
  ],
  seasonal: [
    'spring bloom', 'summer heat', 'autumn leaves', 'winter snow',
    'cherry blossoms', 'fall colors', 'summer festival', 'winter markets',
    'spring rain', 'summer beach', 'autumn harvest', 'winter landscapes'
  ],
  cultural: [
    'traditional setting', 'heritage site', 'cultural center', 'religious space',
    'ceremonial location', 'festival environment', 'market square',
    'community center', 'historical district', 'ethnic neighborhood',
    'artisan workshop', 'cultural institution', 'sacred space'
  ],
  backgrounds: [
    'minimalist white', 'blurred bokeh', 'textured wall', 'urban textures',
    'natural backdrop', 'architectural elements', 'colorful graffiti',
    'vintage wallpaper', 'industrial textures', 'fabric backdrop',
    'wooden panels', 'brick wall', 'glass reflections', 'metal surfaces'
  ]
};
```

### 3.3 Specialized Photography Types (2-3 weeks)
**New Categories:**
```typescript
const specializedTypes = {
  documentary: ['candid moments', 'cultural photography', 'heritage documentation'],
  commercial: ['advertising campaigns', 'brand photography', 'product placement'],
  experimental: ['3D anaglyph effects', 'motion blur', 'artistic techniques'],
  aerial: ['overhead cityscapes', 'birds-eye intersections', 'urban planning views'],
  backstage: ['behind-the-scenes', 'movie stills', 'production photography']
};
```

### 3.4 Cultural & Heritage Photography (2 weeks)
**Structure:**
```typescript
const culturalPhotography = {
  periods: ['1960s-70s', '1980s', '1990s', 'Post-Soviet era'],
  traditions: ['Traditional clothing', 'Cultural activities', 'Heritage crafts'],
  authenticity: ['Documentary style', 'Candid moments', 'Cultural accuracy'],
  settings: ['Traditional homes', 'Cultural sites', 'Heritage locations']
};
```

### 3.5 Smart Features Implementation (3-4 weeks)
**Enhanced Presets:**
```typescript
const presets = {
  'Portrait Photography': { /* existing */ },
  'Interior Architecture': { // NEW
    category: 'Interior',
    style: 'architectural',
    shotType: 'wide',
    lighting: 'natural',
    composition: 'symmetry'
  },
  'Social Media Content': { // NEW
    category: 'Person',
    style: 'lifestyle',
    activities: 'content creation',
    lighting: 'soft',
    technical: 'smartphone optimized'
  },
  'Cultural Heritage': { // NEW
    category: 'Person',
    environment: 'traditional',
    lighting: 'natural',
    style: 'documentary'
  }
};
```

## 🎨 **UX Design Recommendations**

### Person Builder Card Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Main Photography Tool Container (Full Width)                │
│                                                             │
│ ┌─────────────────────┐  ┌─────────────────────────────────┐│
│ │ Person Builder Card │  │ Photography Settings Card       ││
│ │                     │  │                                 ││
│ │ - Demographics      │  │ - Style & Shot Type             ││
│ │ - Physical Features │  │ - Lighting & Shadows            ││
│ │ - Expression        │  │ - Environment                   ││
│ │ - Activities        │  │ - Composition                   ││
│ │ - Clothing          │  │ - Advanced Settings             ││
│ │                     │  │                                 ││
│ │ [Generate Person]   │  │ [Generate Prompt]               ││
│ └─────────────────────┘  └─────────────────────────────────┘│
│                                                             │
│ ┌───────────────────────────────────────────────────────────┐│
│ │ Live Prompt Preview                                       ││
│ │ "A 25-year-old Asian woman with long black hair..."       ││
│ └───────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout Strategy
```
Mobile (Stacked Cards):
┌─────────────────────┐
│ Person Builder Card │
│ [Collapsed/Expanded]│
└─────────────────────┘
┌─────────────────────┐
│ Photography Card    │
│ [Always Visible]    │
└─────────────────────┘
┌─────────────────────┐
│ Live Preview        │
│ [Bottom Sticky]     │
└─────────────────────┘
```

---

## 🔄 **Dynamic Loading Implementation**

### Gender-Aware Feature Loading
```typescript
// Example implementation for dynamic options
const getHairOptions = (gender: string) => {
  switch(gender) {
    case 'man':
      return physicalFeaturesByGender.male.hair;
    case 'woman':
      return physicalFeaturesByGender.female.hair;
    default:
      return physicalFeaturesByGender.person.hair;
  }
};

const getClothingOptions = (gender: string, style: string) => {
  const genderClothing = clothingByGender[gender] || clothingByGender.person;
  return genderClothing[style] || genderClothing.casual;
};
```

---

## 📋 **Comprehensive Missing Values Addressed**

### ✅ **Cultural Context** - Expanded from 5 to 25+ options
### ✅ **Physical Features** - Gender-specific with 15+ hair options per gender  
### ✅ **Clothing** - Gender-aware with style categories
### ✅ **Activities** - 10 categories with 70+ specific actions
### ✅ **Environments** - 6 categories with 100+ specific settings
### ✅ **UX Structure** - Separate card layout for better organization

---

## 🛠 Technical Implementation Details

### Updated File Structure
```
src/
├── components/
│   ├── PromptBuilder.tsx (enhanced)
│   ├── PersonBuilder.tsx (Phase 2)
│   ├── ActivitiesBuilder.tsx (Phase 2)
│   ├── ContentCreationBuilder.tsx (Phase 2) // NEW
│   ├── InteriorArchitecture.tsx (Phase 1A) // NEW
│   ├── CulturalHeritage.tsx (Phase 3) // NEW
│   ├── EnhancedLighting.tsx (current)
│   ├── CompositionBuilder.tsx (Phase 3)
│   └── PresetManager.tsx (Phase 3)
├── contexts/
│   ├── BackgroundContext.tsx (current)
│   └── PromptBuilderContext.tsx (Phase 2)
└── lib/
    ├── backgroundData.ts (current)
    ├── personData.ts (Phase 2)
    ├── activitiesData.ts (Phase 2)
    ├── interiorData.ts (Phase 1A) // NEW
    ├── culturalData.ts (Phase 3) // NEW
    └── presetData.ts (Phase 3)
```

---

## 🛠 Technical Implementation Details

### File Structure Updates
```
src/
├── components/
│   ├── PromptBuilder.tsx (enhanced)
│   ├── PersonBuilder.tsx (new)
│   ├── ActivitiesBuilder.tsx (new)
│   ├── EnhancedLighting.tsx (new)
│   ├── CompositionBuilder.tsx (new)
│   └── PresetManager.tsx (new)
├── contexts/
│   ├── BackgroundContext.tsx (current)
│   └── PromptBuilderContext.tsx (new)
└── lib/
    ├── backgroundData.ts (current)
    ├── personData.ts (new)
    ├── activitiesData.ts (new)
    └── presetData.ts (new)
```

### State Management Strategy
```typescript
// Central context for all prompt building state
const PromptBuilderContext = {
  personDetails: PersonDetails,
  activities: ActivitySelection,
  lighting: EnhancedLighting,
  composition: CompositionRules,
  // ... other sections
  generatePrompt: () => string
};
```

### Prompt Generation Template
```typescript
const generatePrompt = () => {
  const parts = [
    buildPersonDescription(),
    buildActivityDescription(),
    `wearing ${clothing}`,
    buildEnvironmentDescription(),
    buildTechnicalSpecs(),
    buildStyleDescription()
  ].filter(Boolean);
  
  return parts.join(', ') + ' ' + buildParameters();
};
```

---

## 📊 Success Metrics

### Phase 1 Targets
- Maintain current user satisfaction
- 50% of users try new lighting options
- No increase in bounce rate

### Phase 2 Targets
- 80% of person prompts use the person builder
- Average prompt length increases by 40%
- User session time increases by 25%

### Phase 3 Targets
- 60% of users try Advanced mode
- 30% save custom presets
- Mobile usage increases by 50%

---

## 🎯 Implementation Timeline

**Total Estimated Time: 16-20 weeks**

- **Weeks 1-6:** Phase 1 (Foundation)
- **Weeks 7-16:** Phase 2 (Core Features)
- **Weeks 17-20:** Phase 3 (Advanced Features)

### Parallel Development Opportunities
- UX design can happen alongside Phase 1 implementation
- Testing and feedback collection throughout all phases
- Documentation can be developed in parallel

---

## 🔄 Continuous Improvement

### User Feedback Integration
- Implement analytics to track feature usage
- A/B test new features before full rollout
- Collect user feedback at each phase completion

### Post-Launch Features (Future Phases)
- AI-powered prompt suggestions
- Integration with multiple AI image models
- Community sharing of presets and prompts
- Advanced batch generation tools

---

This guide ensures a systematic, user-focused approach to enhancing the photography prompt tool while maintaining stability and usability throughout the development process.