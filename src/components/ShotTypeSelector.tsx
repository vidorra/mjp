'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from '@/components/ui/select';
import { photographyStyles } from './StyleSelector';

// Shot types data
const shotTypes = [
  { value: 'extreme-wide', label: 'Extreme Wide Shot' },
  { value: 'wide', label: 'Wide Shot' },
  { value: 'full', label: 'Full Shot' },
  { value: 'medium', label: 'Medium Shot' },
  { value: 'close-up', label: 'Close-Up Shot' },
  { value: 'extreme-close-up', label: 'Extreme Close-Up' },
  { value: 'macro', label: 'Macro Shot' }
];

// Helper function to get suggested shot types for a photography style
const getSuggestedShotTypes = (style: string) => {
  const photographyStyle = photographyStyles.find(s => s.value === style);
  return photographyStyle?.suggestedShots || [];
};

interface ShotTypeSelectorProps {
  selectedStyle: string;
  shotType: string;
  setShotType: (shotType: string) => void;
  depthOption: string;
  setDepthOption: (depthOption: string) => void;
}

export default function ShotTypeSelector({ 
  selectedStyle, 
  shotType, 
  setShotType, 
  depthOption, 
  setDepthOption 
}: ShotTypeSelectorProps) {
  return (
    <Card>
      <CardHeader variant="no-padding" />
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-start">
          <div className={`min-w-[66%] ${!(['extreme-wide', 'wide', 'full'].includes(shotType)) ? 'flex-grow' : ''}`}>
            <CardTitle className="text-sm mb-2">Shot Type</CardTitle>
            <Select value={shotType} onValueChange={setShotType}>
              <SelectTrigger>
                <SelectValue placeholder="Select shot type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Suggested Shot Types</SelectLabel>
                  {getSuggestedShotTypes(selectedStyle).map((shotValue) => {
                    const shot = shotTypes.find(s => s.value === shotValue);
                    return shot && (
                      <SelectItem
                        key={shot.value}
                        value={shot.value}
                      >
                        {shot.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Other Shot Types</SelectLabel>
                  {shotTypes
                    .filter(shot => !getSuggestedShotTypes(selectedStyle).includes(shot.value))
                    .map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Only show for wide/landscape/full shots */}
          {(['extreme-wide', 'wide', 'full'].includes(shotType)) && (
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium whitespace-nowrap">Add Depth</span>
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-[#FFB768] text-[#FFB768] focus:ring-[#FFB768] transition-colors cursor-pointer"
                checked={!!depthOption}
                onChange={(e) => {
                  if (!e.target.checked) setDepthOption('');
                  else setDepthOption('foreground-detail');
                }}
              />
            </div>
          )}
        </div>

        {/* Depth options in new row */}
        {depthOption && (
          <div className="pt-2">
            <Select value={depthOption} onValueChange={setDepthOption}>
              <SelectTrigger>
                <SelectValue placeholder="Select depth style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="foreground-detail">
                  <div className="flex flex-col">
                    <span>Detailed Foreground</span>
                    <span className="text-xs text-muted-foreground">
                      Emphasize detail in the front
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="depth-of-field">
                  <div className="flex flex-col">
                    <span>Depth of Field</span>
                    <span className="text-xs text-muted-foreground">
                      Gradual focus front to back
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="background-emphasis">
                  <div className="flex flex-col">
                    <span>Background Focus</span>
                    <span className="text-xs text-muted-foreground">
                      Clear subject, soft foreground
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Export for use in other components
export { shotTypes, getSuggestedShotTypes };