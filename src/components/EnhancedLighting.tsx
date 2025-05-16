'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type LightingOptions = {
  type: string;
  quality?: string;
  shadows?: string;
  direction?: string;
};

const lightingTypes = [
  { value: 'natural', label: 'Natural Lighting' },
  { value: 'studio', label: 'Studio Lighting' },
  { value: 'golden-hour', label: 'Golden Hour' },
  { value: 'blue-hour', label: 'Blue Hour' },
  { value: 'fluorescent', label: 'Fluorescent Lighting' }
];

const lightingQualities = [
  { value: 'soft', label: 'Soft' },
  { value: 'dramatic', label: 'Dramatic' },
  { value: 'gentle', label: 'Gentle' },
  { value: 'moody', label: 'Moody' }
];

const shadowOptions = [
  { value: 'soft-shadows', label: 'Soft Shadows' },
  { value: 'dramatic-shadows', label: 'Dramatic Shadows' },
  { value: 'no-harsh-shadows', label: 'No Harsh Shadows' }
];

const lightingDirections = [
  { value: 'backlighting', label: 'Backlighting' },
  { value: 'side-lighting', label: 'Side Lighting' },
  { value: 'natural', label: 'Natural' }
];

interface EnhancedLightingProps {
  value: LightingOptions;
  onChange: (value: LightingOptions) => void;
}

export default function EnhancedLighting({ value, onChange }: EnhancedLightingProps) {
  const updateLighting = (key: keyof LightingOptions, newValue: string) => {
    onChange({
      ...value,
      [key]: newValue
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Lighting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={value.type} onValueChange={(newValue) => updateLighting('type', newValue)}>
          <SelectTrigger>
            <SelectValue placeholder="Select lighting type" />
          </SelectTrigger>
          <SelectContent>
            {lightingTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={value.quality} onValueChange={(newValue) => updateLighting('quality', newValue)}>
          <SelectTrigger>
            <SelectValue placeholder="Select lighting quality" />
          </SelectTrigger>
          <SelectContent>
            {lightingQualities.map((quality) => (
              <SelectItem key={quality.value} value={quality.value}>
                {quality.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={value.shadows} onValueChange={(newValue) => updateLighting('shadows', newValue)}>
          <SelectTrigger>
            <SelectValue placeholder="Select shadow type" />
          </SelectTrigger>
          <SelectContent>
            {shadowOptions.map((shadow) => (
              <SelectItem key={shadow.value} value={shadow.value}>
                {shadow.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={value.direction} onValueChange={(newValue) => updateLighting('direction', newValue)}>
          <SelectTrigger>
            <SelectValue placeholder="Select lighting direction" />
          </SelectTrigger>
          <SelectContent>
            {lightingDirections.map((direction) => (
              <SelectItem key={direction.value} value={direction.value}>
                {direction.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}