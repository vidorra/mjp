'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Types
type PhotographySuggestion = {
  tag: string;
  info: string;
};

// Photography suggestions data
const photographySuggestions: { [key: string]: PhotographySuggestion[] } = {
  'landscape': [
    { tag: 'Motion Blur Effect', info: 'Creates a dynamic feel in landscape shots' },
    { tag: 'Long Exposure', info: 'Great for water and clouds' },
    { tag: 'Golden Hour', info: 'Best time for warm, natural lighting' },
    { tag: 'Wide Angle', info: 'Captures more of the scene' }
  ],
  'portrait': [
    { tag: 'Hair Color', info: 'Specify the subject\'s hair color' },
    { tag: 'Eye Color', info: 'Mention the subject\'s eye color' },
    { tag: 'Age', info: 'Include the subject\'s approximate age' },
    { tag: 'Clothing', info: 'Describe what they\'re wearing' },
    { tag: 'Athletic Build', info: 'Describe the subject\'s physique' },
    { tag: 'Slim Figure', info: 'Describe the subject\'s body type' },
    { tag: 'Glowing Skin', info: 'Describe the skin quality' },
    { tag: 'Confident Pose', info: 'Describe the subject\'s posture' }
  ],
  'street': [
    { tag: 'Location', info: 'Add the city and country name' },
    { tag: 'Time of Day', info: 'Specify when the photo was taken' },
    { tag: 'Weather', info: 'Include weather conditions' },
    { tag: 'Urban Elements', info: 'Mention specific city features' }
  ],
  'cinematic': [
    { tag: 'Mood', info: 'Set the emotional tone of the shot' },
    { tag: 'Color Grading', info: 'Specify color treatment' },
    { tag: 'Composition', info: 'Use cinematic framing techniques' },
    { tag: 'Atmosphere', info: 'Describe the overall ambiance' }
  ],
  'editorial': [
    { tag: 'Story Context', info: 'Provide narrative context' },
    { tag: 'Setting', info: 'Describe the environment' },
    { tag: 'Styling', info: 'Include fashion and prop details' },
    { tag: 'Composition', info: 'Use magazine-style framing' },
    { tag: 'Fashion Details', info: 'Describe specific clothing items' },
    { tag: 'Model Pose', info: 'Describe the subject\'s posture and expression' }
  ],
  'documentary': [
    { tag: 'Event', info: 'Describe the event or situation' },
    { tag: 'Environment', info: 'Include contextual details' },
    { tag: 'Time Period', info: 'Specify when it takes place' },
    { tag: 'Cultural Elements', info: 'Add relevant cultural context' }
  ],
  'architecture & interiors': [
    { tag: 'Room Type', info: 'Specify the type of interior space' },
    { tag: 'Design Style', info: 'Describe the interior design style' },
    { tag: 'Lighting Conditions', info: 'Describe the interior lighting' },
    { tag: 'Architectural Features', info: 'Highlight specific architectural elements' },
    { tag: 'Building Style', info: 'Describe the architectural style' },
    { tag: 'Urban Context', info: 'Describe the surrounding environment' }
  ]
};

interface SuggestionPanelProps {
  selectedStyle: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  tipAlert: string;
  setTipAlert: (tip: string) => void;
}

export default function SuggestionPanel({
  selectedStyle,
  setSubject,
  tipAlert,
  setTipAlert
}: SuggestionPanelProps) {
  // Only render if we have suggestions for the selected style
  if (!selectedStyle || !photographySuggestions[selectedStyle]) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-sm">Suggested Elements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {photographySuggestions[selectedStyle].map((suggestion) => (
            <button
              key={suggestion.tag}
              onClick={() => {
                setSubject(prev => `${prev} ${suggestion.tag}`.trim());
                if (suggestion.info) {
                  setTipAlert(suggestion.info);
                }
              }}
              className="px-3 py-1 bg-[#FFB768] text-white hover:bg-[#FFB768]/90 rounded-full text-sm transition-colors"
            >
              {suggestion.tag}
            </button>
          ))}
        </div>
        {tipAlert && (
          <Alert className="mt-4">
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription>{tipAlert}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

// Export for use in other components
export { photographySuggestions };