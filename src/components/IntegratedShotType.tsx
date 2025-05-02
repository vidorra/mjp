import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';

type ShotTypeProps = {
  shotType: string;
  depthOption: string;
  onShotTypeChange: (value: string) => void;
  onDepthOptionChange: (value: string) => void;
};

// Shot type categories with descriptions
const shotTypeGroups = {
  closeRange: {
    label: 'Close Range',
    description: 'Detailed and intimate shots',
    types: [
      { value: 'extreme-close-up', label: 'Extreme Close-Up', description: 'Captures the finest details' },
      { value: 'close-up', label: 'Close-Up', description: 'Shows subject details clearly' },
      { value: 'macro', label: 'Macro Shot', description: 'Extreme detail of small subjects' }
    ]
  },
  midRange: {
    label: 'Mid Range',
    description: 'Balanced and natural perspective',
    types: [
      { value: 'medium', label: 'Medium Shot', description: 'Natural view of subject' }
    ]
  },
  wideRange: {
    label: 'Wide Range',
    description: 'Subject in environment',
    types: [
      { value: 'full', label: 'Full Shot', description: 'Complete subject with space' },
      { value: 'wide', label: 'Wide Shot', description: 'Subject in environment' },
      { value: 'extreme-wide', label: 'Extreme Wide Shot', description: 'Expansive view of scene' }
    ]
  }
};

const depthOptions = [
  {
    value: 'foreground-detail',
    label: 'Detailed Foreground',
    description: 'Emphasize detail in the front'
  },
  {
    value: 'depth-of-field',
    label: 'Depth of Field',
    description: 'Gradual focus front to back'
  },
  {
    value: 'background-emphasis',
    label: 'Background Focus',
    description: 'Clear subject, soft foreground'
  }
];

export default function IntegratedShotType({
  shotType,
  depthOption,
  onShotTypeChange,
  onDepthOptionChange
}: ShotTypeProps) {
  const isWideShot = ['extreme-wide', 'wide', 'full'].includes(shotType);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Shot Type & Composition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={shotType} onValueChange={onShotTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select shot type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(shotTypeGroups).map(([key, group]) => (
              <SelectGroup key={key}>
                <SelectLabel className="text-sm font-semibold">{group.label}</SelectLabel>
                <div className="pl-2 text-xs text-muted-foreground mb-2">
                  {group.description}
                </div>
                {group.types.map((type) => (
                  <SelectItem 
                    key={type.value} 
                    value={type.value}
                    className="py-3"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {type.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {isWideShot && (
          <div className="space-y-2 pt-2 border-t">
            <div className="text-sm font-medium mb-2">Depth Composition</div>
            <Select value={depthOption} onValueChange={onDepthOptionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select depth style" />
              </SelectTrigger>
              <SelectContent>
                {depthOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="py-3"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}