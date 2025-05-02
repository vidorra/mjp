// lib/backgroundData.ts
export type BackgroundImage = {
  id: string;
  filename: string;
  prompt: string;
  tags: {
    style?: string;
    shotType?: string;
    category?: string;
    subcategory?: string;
    lighting?: string;
  };
};

export const backgroundImages: BackgroundImage[] = [
  {
    id: 'dutch-woman-kitchen',
    filename: 'bg.webp',
    prompt: 'Extreme close-up sideview portrait of a Dutch 42-year-old redhed womans green eye that is cooking in her modern kitchen, taupe walls',
    tags: {
      style: 'portrait',
      shotType: 'extreme-close-up',
      category: 'Person',
      subcategory: 'Individual',
    }
  },
  {
    id: 'face-cream',
    filename: 'face-cream.webp',
    prompt: 'close-up shot of a dark Brown 42-year-old Colombian woman with freckless and Brown eyes and thick eyebrows applying white face cream on her Cheek with her fingertips, ultra detailed, coral peach background, captured with Sony A7 III, studio lighting --style raw --v 6.1 --s 950 --ar 3:2 ',
    tags: {
      style: 'portrait',
      shotType: 'close-up',
      category: 'Person',
      subcategory: 'Individual',
    }
  },
  {
    id: 'mauritanian-male',
    filename: 'mauritanian-male.webp',
    prompt: 'Editorial color photography national geographic, medium sideview shot of 61-year old male in Mauritanian nature, Shot with Hasselblad x2d 100c xcd 90mm f/2.5, ultra sharp, --style raw --ar 3:2 --v 6.1 --s 250',
    tags: {
      style: 'portrait',
      shotType: 'medium',
      category: 'Person',
      subcategory: 'Individual',
    }
  },
  {
    id: 'head-kingfisher-bird',
    filename: 'bird.webp',
    prompt: 'Macro sideview photo of the head of a Kingfisher bird, high detail --s 1000 --v 6.0 --style raw --ar 108:43',
    tags: {
      style: 'macro',
      shotType: 'Macro',
      category: 'Animal',
      subcategory: 'Individual',
    }
  },
  {
    id: 'birdseye-view-amsterdam',
    filename: 'birdseye-view-amsterdam.webp',
    prompt: 'Old city of Amsterdam in 1921, Birds-eye view, birds eye angle shot, captured with Nikon D850, natural lighting --style raw --ar 3:2 --v 6.1 --s 750',
    tags: {
      style: 'landscape',
      shotType: 'Birds-Eye View',
      category: 'Architecture',
      subcategory: '',
    }
  },
  {
    id: 'street-style-florence',
    filename: 'street.webp',
    prompt: 'Female walking in the sunny city of Florence, street style photography, low-angle shot, captured with Fujifilm X-T4, natural lighting --style raw --v 6.0 --s 750 --ar 3:2',
    tags: {
      style: 'Street',
      shotType: 'Low-Angle shot',
      category: 'Person',
      subcategory: 'Individual',
    }
  },
  {
    id: 'yellowstone-grain-field',
    filename: 'Grain_field_Hight_Angle.webp',
    prompt: 'Grain field with the yellowstone national park in the backdrop, Landscape nature, landscape style photography, wide shot, with emphasis on the background and soft foreground, from high-angle angle, captured with Canon EOS R5 using 85mm f/1.2 L, golden-hour lighting --style raw --ar 3:2 --v 6.0 --s 750',
    tags: {
      style: 'landscape',
      shotType: 'wide',
      category: 'Nature',
      subcategory: 'Landscape',
      lighting: 'golden-hour'
    }
  },
  {
    id: 'spain-grain-field',
    filename: 'Grain_field_Low_Angle.webp',
    prompt: 'Golden Grain field in the hills of Spain in summer at sunset, detailed Grain in the front, full shot from low angle, editorial nature photography, depth and texture to the scene, captured with Nikon D850 using 24-70mm f/2.8, golden-hour lighting, --style raw --v 6.1 --s 750 --ar 3:2',
    tags: {
      style: 'landscape',
      shotType: 'full',
      category: 'Nature',
      subcategory: 'Landscape',
      lighting: 'golden-hour'
    }
  }
];

// Define known photography terms for compound matching
const SHOT_TYPES = new Set([
  'extreme close up',
  'extreme close-up',
  'close up',
  'medium shot',
  'wide shot',
  'extreme wide shot',
  'macro',
  'full shot'
]);

// Helper function to normalize strings for comparison
const normalize = (str?: string): string => {
  if (!str) return '';
  return str.toLowerCase()
    .replace(' photography', '')
    .replace(' lighting', '')
    .replace(' shot', '')
    .replace(' view', '')  // Remove 'view' from camera angles
    .replace(/[-\s]+/g, '') // Remove all spaces and hyphens
    .trim();
};

const getTermsToHighlight = (
  style?: string,
  shotType?: string,
  category?: string,
  subcategory?: string,
  lighting?: string,
  cameraAngle?: string
) => {
  const terms = new Set<string>();

  // Debug inputs
  console.log('Input terms:', {
    style,
    shotType,
    category,
    subcategory,
    lighting,
    cameraAngle
  });

  

  // Add style terms
  if (style) {
    const styleBase = normalize(style);
    terms.add(styleBase);
  }

  // Add shot type terms
  if (shotType) {
    const shotBase = normalize(shotType);
    terms.add(shotBase);
  }

  // Add category and subcategory (handle both singular and plural forms)
  if (category) {
    terms.add(normalize(category));
    // Add singular/plural variations
    terms.add(normalize(category) + 's');
    terms.add(normalize(category).replace(/s$/, ''));
  }
  if (subcategory) {
    terms.add(normalize(subcategory));
    terms.add(normalize(subcategory) + 's');
    terms.add(normalize(subcategory).replace(/s$/, ''));
  }

  // Debug what we're receiving
  console.log('Camera Angle:', cameraAngle);

  const termsToHighlight = new Set<string>();
  
  if (style) {
    termsToHighlight.add(normalize(style));
  }
  
  if (shotType) {
    termsToHighlight.add(normalize(shotType));
  }
  
  if (category) {
    termsToHighlight.add(normalize(category));
  }
  
  if (subcategory) {
    termsToHighlight.add(normalize(subcategory));
  }

  

  // Handle camera angles - add multiple variations
  if (cameraAngle) {
    const angleBase = normalize(cameraAngle.replace(' view', ''));
    console.log('Camera angle base:', angleBase);
    
    // Add all variations
    terms.add(angleBase);                 // e.g., 'side'
    terms.add(angleBase + 'view');        // e.g., 'sideview'
    terms.add(angleBase + '-view');       // e.g., 'side-view'
    terms.add(angleBase.replace('-', '')); // Remove any remaining hyphens
  }

   // Add other terms...
   if (style) terms.add(normalize(style));
   if (shotType) terms.add(normalize(shotType));
   if (category) terms.add(normalize(category));
   if (subcategory) terms.add(normalize(subcategory));
   if (lighting) terms.add(normalize(lighting));

  // Add lighting terms
  if (lighting) {
    const lightingBase = normalize(lighting);
    terms.add(lightingBase);
  }

  console.log('Generated terms to highlight:', Array.from(terms));
  return terms;
};

export function findMatchingImage(
  style?: string,
  shotType?: string,
  category?: string,
  subcategory?: string,
  lighting?: string
): BackgroundImage {
  const scoredImages = backgroundImages.map(img => {
    let score = 0;
    const tags = img.tags;

    if (category && normalize(tags.category) === normalize(category)) score += 4;
    if (style && normalize(tags.style) === normalize(style)) score += 3;
    if (shotType && normalize(tags.shotType) === normalize(shotType)) score += 2;
    if (subcategory && normalize(tags.subcategory) === normalize(subcategory)) score += 2;
    if (lighting && normalize(tags.lighting) === normalize(lighting)) score += 1;

    return { image: img, score };
  });

  const bestMatch = scoredImages.sort((a, b) => b.score - a.score)[0];
  return bestMatch.score > 0 ? bestMatch.image : backgroundImages[0];
}

const checkWord = (word: string, terms: Set<string>) => {
  const normalized = normalize(word);
  const noSpaces = normalized.replace(/[-\s]+/g, '');
  return terms.has(normalized) || terms.has(noSpaces);
};

export function getHighlightedWords(
  prompt: string,
  style?: string,
  shotType?: string,
  category?: string,
  subcategory?: string,
  lighting?: string,
  cameraAngle?: string
): string[] {
  const commonWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'that', 'this', 'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being'
  ]);

  const termsToHighlight = getTermsToHighlight(
    style,
    shotType,
    category,
    subcategory,
    lighting,
    cameraAngle
  );

  const words = prompt.toLowerCase().split(' ');
  const highlightedWords = new Set<string>();

  const checkWord = (word: string, terms: Set<string>) => {
    const normalized = normalize(word);
    const noSpaces = normalized.replace(/[-\s]+/g, '');
    return terms.has(normalized) || terms.has(noSpaces);
  };  

  // Process words and their combinations
  words.forEach((word, index) => {
    // Debug each word being checked
    console.log(`Checking word: "${word}"`);
    console.log(`Normalized form: "${normalize(word)}"`);
    
    if (commonWords.has(word)) {
      console.log(`Skipping common word: ${word}`);
      return;
    }

    if (checkWord(word, termsToHighlight)) {
      highlightedWords.add(word);
    }
    
    // Check the word itself
    const normalizedWord = normalize(word);
    if (termsToHighlight.has(normalizedWord)) {
      console.log(`Match found for: ${word}`);
      highlightedWords.add(word);
      return;
    }

    // Check for compound terms
    if (index < words.length - 1) {
      const nextWord = words[index + 1];
      const compoundTerm = normalize(word + nextWord);
      const hyphenatedTerm = normalize(word + '-' + nextWord);
      const spacedTerm = normalize(word + ' ' + nextWord);

      console.log(`Checking compound terms:`, {
        compoundTerm,
        hyphenatedTerm,
        spacedTerm
      });

      if (
        termsToHighlight.has(compoundTerm) ||
        termsToHighlight.has(hyphenatedTerm) ||
        termsToHighlight.has(spacedTerm)
      ) {
        console.log(`Compound match found for: ${word} ${nextWord}`);
        highlightedWords.add(word);
        highlightedWords.add(nextWord);
      }
    }
  });

  console.log('Final highlighted words:', Array.from(highlightedWords));
  return Array.from(highlightedWords);
}