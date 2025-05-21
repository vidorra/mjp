'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bodySpecifications, physicalFeaturesByGender, clothingByGender } from '@/lib/bodySpecifications';

interface PersonBuilderProps {
  onPersonDetailsChange: (details: string) => void;
}

export default function PersonBuilder({ onPersonDetailsChange }: PersonBuilderProps) {
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [ethnicity, setEthnicity] = useState<string>('');
  const [hairStyle, setHairStyle] = useState<string>('');
  const [eyeColor, setEyeColor] = useState<string>('');
  const [skinTone, setSkinTone] = useState<string>('');
  const [build, setBuild] = useState<string>('');
  const [clothing, setClothing] = useState<string>('');
  const [expression, setExpression] = useState<string>('');

  // Age options
  const ageOptions = ['young', 'teens', '20s', '30s', '40s', '50s', '60s', '70s+', 'elderly'];

  // Ethnicity options
  const ethnicityOptions = [
    'Asian', 'African', 'European', 'Latin', 'Middle Eastern', 'Native American',
    'Pacific Islander', 'Mixed Ethnicity', 'South Asian', 'Southeast Asian', 
    'East Asian', 'Scandinavian', 'Mediterranean', 'Caribbean'
  ];

  // Eye color options
  const eyeColorOptions = ['brown eyes', 'blue eyes', 'green eyes', 'hazel eyes', 'amber eyes', 'gray eyes'];

  // Skin tone options
  const skinToneOptions = [
    'pale skin', 'fair skin', 'warm skin', 'olive skin', 'dark skin', 
    'bronze skin', 'golden skin', 'porcelain skin', 'sun-kissed skin',
    'weathered skin', 'glowing skin', 'freckled skin'
  ];

  // Expression options
  const expressionOptions = [
    'serene', 'confident', 'smiling', 'contemplative', 'passionate', 'focused',
    'mysterious', 'joyful', 'intense', 'peaceful', 'determined', 'gentle',
    'fierce', 'vulnerable', 'wise', 'playful', 'melancholic', 'radiant'
  ];

  // Get hair options based on gender
  const getHairOptions = () => {
    if (!gender) return [];
    return physicalFeaturesByGender[gender as keyof typeof physicalFeaturesByGender]?.hair || [];
  };

  // Get build options based on gender
  const getBuildOptions = () => {
    if (!gender) return bodySpecifications.build;
    return physicalFeaturesByGender[gender as keyof typeof physicalFeaturesByGender]?.build || bodySpecifications.build;
  };

  // Get clothing options based on gender
  const getClothingOptions = () => {
    if (!gender) return [];
    
    const genderClothing = clothingByGender[gender as keyof typeof clothingByGender];
    if (!genderClothing) return [];
    
    return [
      ...genderClothing.casual,
      ...genderClothing.formal,
      ...genderClothing.accessories
    ];
  };

  // Generate person description
  const generatePersonDescription = () => {
    const details = [
      age,
      ethnicity,
      gender,
      hairStyle,
      eyeColor,
      skinTone,
      build,
      clothing,
      expression ? `with ${expression} expression` : ''
    ].filter(Boolean).join(', ');

    onPersonDetailsChange(details);
    return details;
  };

  // Update description when any field changes
  React.useEffect(() => {
    generatePersonDescription();
  }, [gender, age, ethnicity, hairStyle, eyeColor, skinTone, build, clothing, expression]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Person Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Gender Selection */}
        <div>
          <label className="text-sm font-medium mb-1 block">Gender</label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="person">Non-binary/Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age Selection */}
        <div>
          <label className="text-sm font-medium mb-1 block">Age</label>
          <Select value={age} onValueChange={setAge}>
            <SelectTrigger>
              <SelectValue placeholder="Select age" />
            </SelectTrigger>
            <SelectContent>
              {ageOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ethnicity Selection */}
        <div>
          <label className="text-sm font-medium mb-1 block">Ethnicity</label>
          <Select value={ethnicity} onValueChange={setEthnicity}>
            <SelectTrigger>
              <SelectValue placeholder="Select ethnicity" />
            </SelectTrigger>
            <SelectContent>
              {ethnicityOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hair Style Selection - Only show if gender is selected */}
        {gender && (
          <div>
            <label className="text-sm font-medium mb-1 block">Hair</label>
            <Select value={hairStyle} onValueChange={setHairStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select hair style" />
              </SelectTrigger>
              <SelectContent>
                {getHairOptions().map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Eye Color Selection */}
        <div>
          <label className="text-sm font-medium mb-1 block">Eye Color</label>
          <Select value={eyeColor} onValueChange={setEyeColor}>
            <SelectTrigger>
              <SelectValue placeholder="Select eye color" />
            </SelectTrigger>
            <SelectContent>
              {eyeColorOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skin Tone Selection */}
        <div>
          <label className="text-sm font-medium mb-1 block">Skin Tone</label>
          <Select value={skinTone} onValueChange={setSkinTone}>
            <SelectTrigger>
              <SelectValue placeholder="Select skin tone" />
            </SelectTrigger>
            <SelectContent>
              {skinToneOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Build Selection */}
        <div>
          <label className="text-sm font-medium mb-1 block">Build</label>
          <Select value={build} onValueChange={setBuild}>
            <SelectTrigger>
              <SelectValue placeholder="Select build" />
            </SelectTrigger>
            <SelectContent>
              {getBuildOptions().map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clothing Selection - Only show if gender is selected */}
        {gender && (
          <div>
            <label className="text-sm font-medium mb-1 block">Clothing</label>
            <Select value={clothing} onValueChange={setClothing}>
              <SelectTrigger>
                <SelectValue placeholder="Select clothing" />
              </SelectTrigger>
              <SelectContent>
                {getClothingOptions().map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Expression Selection */}
        <div>
          <label className="text-sm font-medium mb-1 block">Expression</label>
          <Select value={expression} onValueChange={setExpression}>
            <SelectTrigger>
              <SelectValue placeholder="Select expression" />
            </SelectTrigger>
            <SelectContent>
              {expressionOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preview */}
        <div className="mt-4 p-3 bg-muted rounded-md">
          <h4 className="text-sm font-medium mb-1">Person Description:</h4>
          <p className="text-sm">{generatePersonDescription() || "No details selected yet"}</p>
        </div>
      </CardContent>
    </Card>
  );
}