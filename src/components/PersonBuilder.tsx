'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { bodySpecifications, physicalFeaturesByGender, clothingByGender } from '@/lib/bodySpecifications';
import { roleOptions, facialFeatures, facialHair, heightOptions, weightOptions } from '@/lib/personData';
import photographyPersonas, { getPersonaDescription } from '@/lib/photographyPersonas';

interface PersonBuilderProps {
  onPersonDetailsChange: (details: string) => void;
  gender?: string; // Optional gender prop from parent component
}

export default function PersonBuilder({ onPersonDetailsChange, gender: initialGender }: PersonBuilderProps) {
  // Basic demographics
  const [gender, setGender] = useState<string>(initialGender || '');
  const [role, setRole] = useState<string>('');
  const [selectedPersona, setSelectedPersona] = useState<string>('');
  
  // Update gender when initialGender changes
  useEffect(() => {
    console.log(`initialGender changed to: ${initialGender}`);
    if (initialGender) {
      console.log(`Setting gender to: ${initialGender}`);
      setGender(initialGender);
      
      // Reset gender-specific fields when gender changes
      setHairStyle('');
      setBuild(''); // Reset build as options are gender-specific
      
      // Reset facial hair for males
      if (initialGender === 'male') {
        setFacialHairStyle('');
      } else {
        setFacialHairStyle(''); // Clear facial hair for non-males
      }
      
      // Reset clothing as options are gender-specific
      setClothing('');
      
      // Force a re-render of the gender-specific options
      setTimeout(() => {
        console.log(`Hair options after gender change: ${getHairOptions().length}`);
        console.log(`Build options after gender change: ${getBuildOptions().length}`);
        console.log(`Clothing options after gender change: ${getClothingOptions().length}`);
      }, 0);
    }
  }, [initialGender]);
  const [age, setAge] = useState<string>('');
  const [ethnicity, setEthnicity] = useState<string>('');
  
  // Physical features
  const [hairStyle, setHairStyle] = useState<string>('');
  const [facialHairStyle, setFacialHairStyle] = useState<string>('');
  const [eyeColor, setEyeColor] = useState<string>('');
  const [skinTone, setSkinTone] = useState<string>('');
  const [facialFeature, setFacialFeature] = useState<string>('');
  const [build, setBuild] = useState<string>('');
  
  // Body specifications
  const [height, setHeight] = useState<string>('');
  const [specificHeight, setSpecificHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [specificWeight, setSpecificWeight] = useState<string>('');
  
  // Clothing and expression
  const [clothing, setClothing] = useState<string>('');
  const [expression, setExpression] = useState<string>('');
  
  // Custom gender for "Other" option
  const [customGender, setCustomGender] = useState<string>('');
  
  // Show specific measurements
  const [showSpecificHeight, setShowSpecificHeight] = useState<boolean>(false);
  const [showSpecificWeight, setShowSpecificWeight] = useState<boolean>(false);

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

  // Apply persona function
  const applyPersona = (personaName: string) => {
    const persona = photographyPersonas[personaName];
    if (!persona) return;

    // Set the selected persona
    setSelectedPersona(personaName);

    // Set basic properties
    setRole(persona.role);
    setAge(persona.age);
    if (persona.build) setBuild(persona.build);
    setClothing(persona.clothing);
    setExpression(persona.expression);
    
    // Handle details
    if (persona.details) {
      if (persona.details.height) setHeight(persona.details.height);
      if (persona.details.specificHeight) setShowSpecificHeight(true);
      if (persona.details.weight) setWeight(persona.details.weight);
      if (persona.details.specificWeight) setShowSpecificWeight(true);
      if (persona.details.build) setBuild(persona.details.build);
    }
  };

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
    // Handle custom gender for "Other" option
    const displayGender = gender === 'other' && customGender ? customGender : gender;
    
    // Start with the persona name if one is selected
    const detailsArray = [];
    
    // Add persona name at the beginning if selected
    if (selectedPersona) {
      detailsArray.push(selectedPersona);
    }
    
    // Add all other details
    detailsArray.push(
      role,
      age,
      ethnicity,
      displayGender,
      hairStyle,
      gender === 'male' && facialHairStyle ? facialHairStyle : '',
      eyeColor,
      skinTone,
      facialFeature,
      build,
      height,
      showSpecificHeight && specificHeight ? `${specificHeight} tall` : '',
      weight,
      showSpecificWeight && specificWeight ? `weighing ${specificWeight}` : '',
      clothing,
      expression ? `with ${expression} expression` : ''
    );
    
    const details = detailsArray.filter(Boolean).join(', ');

    onPersonDetailsChange(details);
    return details;
  };

  // Update description when any field changes
  useEffect(() => {
    generatePersonDescription();
  }, [
    selectedPersona, gender, customGender, role, age, ethnicity,
    hairStyle, facialHairStyle, eyeColor, skinTone, facialFeature,
    build, height, specificHeight, weight, specificWeight,
    clothing, expression
  ]);

  // Function to apply a random persona
  const applyRandomPersona = () => {
    const personaNames = Object.keys(photographyPersonas);
    const randomIndex = Math.floor(Math.random() * personaNames.length);
    const randomPersona = personaNames[randomIndex];
    applyPersona(randomPersona);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Person Builder</CardTitle>
          <CardDescription>Create detailed person descriptions</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={applyRandomPersona}
          title="Apply a random persona"
        >
          <i className="far fa-random mr-1"></i>
          Random
        </Button>
      </CardHeader>
      <CardContent>

        {/* Two-column layout for form fields */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {/* Left Column */}
          <div className="space-y-3">
            {/* Custom Gender Input - Only show if "Other" is selected */}
            {gender === 'other' && (
              <div>
                <label className="text-sm font-medium mb-1 block">Specify Gender</label>
                <Input
                  value={customGender}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomGender(e.target.value)}
                  placeholder="Specify gender identity"
                />
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="text-sm font-medium mb-1 block">Role</label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
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

            {/* Facial Hair - Only show for males */}
            {gender === 'male' && (
              <div>
                <label className="text-sm font-medium mb-1 block">Facial Hair</label>
                <Select value={facialHairStyle} onValueChange={setFacialHairStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select facial hair" />
                  </SelectTrigger>
                  <SelectContent>
                    {facialHair.map((option) => (
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
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {/* Facial Features */}
            <div>
              <label className="text-sm font-medium mb-1 block">Facial Features</label>
              <Select value={facialFeature} onValueChange={setFacialFeature}>
                <SelectTrigger>
                  <SelectValue placeholder="Select facial features" />
                </SelectTrigger>
                <SelectContent>
                  {facialFeatures.map((option) => (
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

            {/* Height Selection */}
            <div>
              <label className="text-sm font-medium mb-1 block">Height</label>
              <Select value={height} onValueChange={(value) => {
                setHeight(value);
                setShowSpecificHeight(value === 'specific height (e.g., 1.85m)');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select height" />
                </SelectTrigger>
                <SelectContent>
                  {heightOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                  <SelectItem value="specific height (e.g., 1.85m)">Specific height</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Specific Height Input */}
            {showSpecificHeight && (
              <div>
                <label className="text-sm font-medium mb-1 block">Specific Height</label>
                <Input
                  value={specificHeight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpecificHeight(e.target.value)}
                  placeholder="e.g., 1.85m or 6 feet 2 inches"
                />
              </div>
            )}

            {/* Weight Selection */}
            <div>
              <label className="text-sm font-medium mb-1 block">Weight</label>
              <Select value={weight} onValueChange={(value) => {
                setWeight(value);
                setShowSpecificWeight(value === 'specific weight');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  {weightOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                  <SelectItem value="specific weight">Specific weight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Specific Weight Input */}
            {showSpecificWeight && (
              <div>
                <label className="text-sm font-medium mb-1 block">Specific Weight</label>
                <Input
                  value={specificWeight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpecificWeight(e.target.value)}
                  placeholder="e.g., 75kg or 165lbs"
                />
              </div>
            )}

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
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 p-3 bg-muted rounded-md">
          <h4 className="text-sm font-medium mb-1">Person Description:</h4>
          <p className="text-sm">{generatePersonDescription() || "No details selected yet"}</p>
        </div>
      </CardContent>
    </Card>
  );
}