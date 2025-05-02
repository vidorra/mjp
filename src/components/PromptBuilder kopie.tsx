'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useBackground } from '../contexts/BackgroundContext';
import PromptOverlay from './PromptOverlay';


// Types
type ObjectCategory = {
  category: string;
  subcategories: string[];
};

type PhotographySuggestion = {
  tag: string;
  info: string;
};

type Cameras = {
  [key: string]: string;
};

// Data
const objectCategories: ObjectCategory[] = [
  {
    category: 'Person',
    subcategories: ['Individual', 'Group', 'Professional', 'Athlete', 'Artist', 'Student']
  },
  {
    category: 'Animal',
    subcategories: ['Wild', 'Pet', 'Bird', 'Marine', 'Insect', 'Reptile']
  },
  {
    category: 'Product',
    subcategories: ['Electronics', 'Fashion', 'Food', 'Furniture', 'Vehicle', 'Jewelry']
  },
  {
    category: 'Architecture',
    subcategories: ['Building', 'Interior', 'Monument', 'Bridge', 'Urban', 'Historical']
  },
  {
    category: 'Nature',
    subcategories: ['Landscape', 'Seascape', 'Mountain', 'Forest', 'Desert', 'Weather']
  }
];

const photographyStyles = [
  { value: 'product', label: 'Product Photography' },
  { value: 'portrait', label: 'Portrait Photography' },
  { value: 'landscape', label: 'Landscape Photography' },
  { value: 'street', label: 'Street Photography' },
  { value: 'macro', label: 'Macro Photography' }
];

const shotTypes = [
  { value: 'macro', label: 'Macro Shot' },
  { value: 'close-up', label: 'Close-Up Shot' },
  { value: 'extreme-close-up', label: 'Extreme Close-Up' },
  { value: 'birds-eye', label: "Bird's-Eye View" },
  { value: 'low-angle', label: 'Low Angle Shot' },
  { value: 'over-shoulder', label: 'Over The Shoulder' }
];

const lightingTypes = [
  { value: 'natural', label: 'Natural Lighting' },
  { value: 'studio', label: 'Studio Lighting' },
  { value: 'golden-hour', label: 'Golden Hour' },
  { value: 'blue-hour', label: 'Blue Hour' },
  { value: 'fluorescent', label: 'Fluorescent Lighting' }
];

const cameras: Cameras = {
  'product': 'Canon EOS R5',
  'portrait': 'Sony A7 III',
  'landscape': 'Nikon D850',
  'street': 'Fujifilm X-T4',
  'macro': 'Canon MP-E 65mm f/2.8'
};

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
    { tag: 'Clothing', info: 'Describe what they\'re wearing' }
  ],
  'street': [
    { tag: 'Location', info: 'Add the city and country name' },
    { tag: 'Time of Day', info: 'Specify when the photo was taken' },
    { tag: 'Weather', info: 'Include weather conditions' },
    { tag: 'Urban Elements', info: 'Mention specific city features' }
  ]
};





export default function PromptBuilder() {
  // Base states
  const [imageSize, setImageSize] = useState('landscape');
  const [aspectRatio, setAspectRatio] = useState('3:2');
  const [mode, setMode] = useState('raw');
  const [version, setVersion] = useState('6.1');
  const [stylization, setStylization] = useState(50);
  const [weirdness, setWeirdness] = useState(0);
  const [variety, setVariety] = useState(0);
  const [speed, setSpeed] = useState('fast');
  const [subject, setSubject] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('product');
  const [shotType, setShotType] = useState('close-up');
  const [lighting, setLighting] = useState('natural');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [tipAlert, setTipAlert] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const { updateBackground } = useBackground();

  const setImageFormat = (format: string) => {
    setImageSize(format);
    switch (format) {
      case 'portrait':
        setAspectRatio('2:3');
        break;
      case 'square':
        setAspectRatio('1:1');
        break;
      case 'landscape':
        setAspectRatio('3:2');
        break;
      case 'widescreen':
        setAspectRatio('16:9');
        break;
      case 'cinematic':
        setAspectRatio('21:9');
        break;
      default:
        setAspectRatio('1:1');
    }
  };

  const generatePrompt = () => {
    if (!subject) {
      setGeneratedPrompt('Please enter a subject first');
      return;
    }
  
    const promptParts = [
      subject,
      selectedCategory && selectedSubcategory ? `${selectedSubcategory} ${selectedCategory.toLowerCase()}` : '',
      `${selectedStyle} style photography`,
      `${shotType} shot`,
      `captured with ${cameras[selectedStyle]}`,
      `${lighting} lighting`
    ].filter(Boolean);

    const parameters = [];
    if (mode === 'raw') parameters.push('--style raw');
    if (stylization !== 50) parameters.push(`--stylize ${stylization}`);
    if (variety !== 0) parameters.push(`--chaos ${variety}`);
    parameters.push(`--ar ${aspectRatio.replace(':', '')}`);
    parameters.push(`--v 6`);

    const finalPrompt = promptParts.join(', ') + ' ' + parameters.join(' ');
    setGeneratedPrompt(finalPrompt);
  };

  useEffect(() => {
    updateBackground(selectedStyle, shotType, selectedCategory, selectedSubcategory, lighting);
  }, [selectedStyle, shotType, selectedCategory, selectedSubcategory, lighting, updateBackground]);


  // Update background when relevant selections change
  useEffect(() => {
    console.log('Current selections:', {
      style: selectedStyle,
      shotType,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      lighting
    });
  }, [selectedStyle, shotType, selectedCategory, selectedSubcategory, lighting]);
  
  

  return (
    
    <div className="space-y-6">
      <div className="relative">
        <input 
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What will you imagine?"
          className="input-glass"
        />
      </div>
      <div className="backdrop-blur-lg bg-[#FFF8F5] rounded-[24px] shadow-lg p-6 text-black">
      {/* Main input */}  
      

      {/* Main selections grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Object Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm ">Object Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {objectCategories.map((cat) => (
                  <SelectItem key={cat.category} value={cat.category}>
                    {cat.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedCategory && (
              <div className="mt-4">
                <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {objectCategories
                      .find(cat => cat.category === selectedCategory)
                      ?.subcategories.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Photography Style */}
        <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm ">Photography Style</CardTitle>
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
            {selectedStyle && photographySuggestions[selectedStyle] && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Suggested Elements</h4>
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
              </div>
            )}
          </CardContent>
        </Card>

        
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm ">Shot Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={shotType} onValueChange={setShotType}>
              <SelectTrigger>
                <SelectValue placeholder="Select shot type" />
              </SelectTrigger>
              <SelectContent>
                {shotTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm ">Lighting</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={lighting} onValueChange={setLighting}>
              <SelectTrigger>
                <SelectValue placeholder="Select lighting" />
              </SelectTrigger>
              <SelectContent>
                {lightingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      
{/* Suggestion Badges */}
{selectedStyle && photographySuggestions[selectedStyle] && (
<Card className="mt-6">
  <CardHeader>
    <CardTitle className="text-sm ">Suggested Elements</CardTitle>
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
)}

{/* Advanced Settings Section */}
<div className="w-full overflow-hidden rounded-lg mt-6">
<button
  onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
  className="w-full px-4 py-3 bg-card flex justify-between items-center hover:bg-card-90 transition-colors"
>
  <span className="text-lg font-semibold">Advanced Settings</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transform transition-transform duration-200 ${
      isAdvancedOpen ? 'rotate-180' : ''
    }`}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
</button>

<div 
  className={`transition-all duration-200 overflow-hidden ${
    isAdvancedOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
  }`}
>
  <div className="p-4 border-t">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Image Size Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm ">Image Size</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-gray-500"
            onClick={() => setImageFormat('landscape')}
          >
            Reset
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={imageSize === 'portrait' ? 'default' : 'secondary'}
                onClick={() => setImageFormat('portrait')}
                className="flex-1"
              >
                Portrait
              </Button>
              <Button 
                variant={imageSize === 'square' ? 'default' : 'secondary'}
                onClick={() => setImageFormat('square')}
                className="flex-1"
              >
                Square
              </Button>
              <Button 
                variant={imageSize === 'landscape' ? 'default' : 'secondary'}
                onClick={() => setImageFormat('landscape')}
                className="flex-1"
              >
                Landscape
              </Button>
              <Button 
                variant={imageSize === 'widescreen' ? 'default' : 'secondary'}
                onClick={() => setImageFormat('widescreen')}
                className="flex-1"
              >
                Widescreen
              </Button>
              <Button 
                variant={imageSize === 'cinematic' ? 'default' : 'secondary'}
                onClick={() => setImageFormat('cinematic')}
                className="flex-1"
              >
                Cinematic
              </Button>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center p-4">
              <div className="text-sm ">Aspect Ratio: {aspectRatio}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm ">Model Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <span className="text-sm">Mode</span>
            <div className="flex gap-2">
              <Button 
                variant={mode === 'standard' ? 'default' : 'secondary'}
                onClick={() => setMode('standard')}
                className="flex-1"
              >
                Standard
              </Button>
              <Button 
                variant={mode === 'raw' ? 'default' : 'secondary'}
                onClick={() => setMode('raw')}
                className="flex-1"
              >
                Raw
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-sm">Stylization</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={stylization}
              onChange={(e) => setStylization(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0</span>
              <span>{stylization}</span>
              <span>1000</span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-sm">Variety</span>
            <input
              type="range"
              min="0"
              max="100"
              value={variety}
              onChange={(e) => setVariety(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0</span>
              <span>{variety}</span>
              <span>100</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>
</div>

{/* Generate Button */}
<div className="flex justify-center pt-6">
<Button 
  onClick={generatePrompt}
  className="btn-large rounded-[24px]  p-6 text-lg font-semibold"
>
  Generate Prompt
</Button>
</div>

{/* Generated Prompt Display */}
{generatedPrompt && (
<Alert className="mt-6">
  <AlertTitle>Generated Prompt:</AlertTitle>
  <AlertDescription className="mt-2 text-sm break-words">
    {generatedPrompt}
  </AlertDescription>
</Alert>
)} 

{/* Add console log right before PromptOverlay */}
{console.log('Rendering PromptOverlay with props:', {
      style: selectedStyle,
      shotType,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      lighting
    })}

          
    </div>
    <PromptOverlay 
    style={selectedStyle}
    shotType={shotType}
    category={selectedCategory}
    subcategory={selectedSubcategory}
    lighting={lighting}
  /> 
    </div>
    
    
  );
}

