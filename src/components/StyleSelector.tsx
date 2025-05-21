'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Photography styles data
const photographyStyles = [
  { value: 'product', label: 'Product Photography', suggestedShots: ['close-up', 'medium'] },
  { value: 'portrait', label: 'Portrait Photography', suggestedShots: ['extreme-close-up', 'medium', 'close-up'] },
  { value: 'landscape', label: 'Landscape Photography', suggestedShots: ['wide', 'extreme-wide'] },
  { value: 'street', label: 'Street Photography', suggestedShots: ['medium', 'wide'] },
  { value: 'macro', label: 'Macro Photography', suggestedShots: ['macro', 'extreme-close-up'] },
  { value: 'cinematic', label: 'Cinematic Photography', suggestedShots: ['wide', 'medium'] },
  { value: 'editorial', label: 'Editorial Photography', suggestedShots: ['medium', 'full'] },
  { value: 'documentary', label: 'Documentary Photography', suggestedShots: ['medium', 'wide'] }
];

interface StyleSelectorProps {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
}

export default function StyleSelector({ selectedStyle, setSelectedStyle }: StyleSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Photography Style</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
          <SelectTrigger>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            {photographyStyles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

// Export the styles data for use in other components
export { photographyStyles };