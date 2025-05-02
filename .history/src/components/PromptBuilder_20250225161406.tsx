'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useBackground } from '../contexts/BackgroundContext';
import PromptOverlay from './PromptOverlay';
import { CameraAngle, cameraAngles, getSuggestedAngles } from '@/types/photography';
import '@/styles/fontawesome.css';

// Types
type ObjectCategory = {
  category: string;
  subcategories: string[];
};

type PhotographySuggestion = {
  tag: string;
  info: string;
};

type CameraGear = {
  camera: string;
  lens: string;
  notes?: string;
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

// Updated shot types with clear separation
const shotTypes = [
  { value: 'extreme-wide', label: 'Extreme Wide Shot' },
  { value: 'wide', label: 'Wide Shot' },
  { value: 'full', label: 'Full Shot' },
  { value: 'medium', label: 'Medium Shot' },
  { value: 'close-up', label: 'Close-Up Shot' },
  { value: 'extreme-close-up', label: 'Extreme Close-Up' },
  { value: 'macro', label: 'Macro Shot' }
];





// const cameraAngles = [
//   // Basic Angles
//   { value: 'front-view', label: 'Front View' },
//   { value: 'side-view', label: 'Side View' },
//   { value: 'three-quarter', label: 'Three-Quarter View' },
//   { value: 'back-view', label: 'Back View' },
  
//   // Vertical Angles
//   { value: 'eye-level', label: 'Eye Level' },
//   { value: 'high-angle', label: 'High Angle' },
//   { value: 'low-angle', label: 'Low Angle' },
//   { value: 'birds-eye', label: "Bird's Eye View" },
//   { value: 'worms-eye', label: "Worm's Eye View" },
//   { value: 'overhead', label: 'Overhead Shot' },
  
//   // Specialized Angles
//   { value: 'dutch-angle', label: 'Dutch Angle' },
//   { value: 'over-shoulder', label: 'Over The Shoulder' },
//   { value: 'profile', label: 'Profile View' },
//   { value: 'diagonal', label: 'Diagonal View' },
//   { value: '45-degree', label: '45 Degree Angle' },
  
//   // Dynamic Angles
//   { value: 'tilted', label: 'Tilted View' },
//   { value: 'canted', label: 'Canted Angle' },
//   { value: 'oblique', label: 'Oblique View' }
// ];

const lightingTypes = [
  { value: 'natural', label: 'Natural Lighting' },
  { value: 'studio', label: 'Studio Lighting' },
  { value: 'golden-hour', label: 'Golden Hour' },
  { value: 'blue-hour', label: 'Blue Hour' },
  { value: 'fluorescent', label: 'Fluorescent Lighting' }
];

// Updated camera recommendations based on style and shot type
const cameraRecommendations: { [key: string]: { [key: string]: CameraGear } } = {
  'portrait': {
    'extreme-close-up': {
      camera: 'Canon EOS R5',
      lens: '100mm f/2.8L Macro IS USM',
      notes: 'Excellent for detailed facial features, eye shots'
    },
    'close-up': {
      camera: 'Sony A7 IV',
      lens: '85mm f/1.4 GM',
      notes: 'Perfect for headshots with beautiful bokeh'
    },
    'medium': {
      camera: 'Sony A7 III',
      lens: '70-200mm f/2.8 GM',
      notes: 'Versatile for half-body and environmental portraits'
    },
    'full': {
      camera: 'Canon EOS R6',
      lens: '24-70mm f/2.8L',
      notes: 'Great for full-body fashion shots'
    }
  },
  'product': {
    'extreme-close-up': {
      camera: 'Canon EOS R5',
      lens: 'MP-E 65mm f/2.8 Macro',
      notes: 'For extremely detailed product texture shots'
    },
    'close-up': {
      camera: 'Sony A7R V',
      lens: '90mm f/2.8 Macro G',
      notes: 'High resolution for product details'
    },
    'medium': {
      camera: 'Canon R5',
      lens: '24-105mm f/4L',
      notes: 'Versatile for various product sizes'
    }
  },
  'landscape': {
    'extreme-wide': {
      camera: 'Nikon D850',
      lens: '14-24mm f/2.8',
      notes: 'Ultra-wide for dramatic landscapes'
    },
    'wide': {
      camera: 'Sony A7R V',
      lens: '16-35mm f/2.8 GM',
      notes: 'Standard landscape setup'
    }
  },
  'street': {
    'wide': {
      camera: 'Fujifilm X-T4',
      lens: '16mm f/1.4',
      notes: 'Discrete wide-angle street scenes'
    },
    'medium': {
      camera: 'Leica Q2',
      lens: '28mm f/1.7 (Fixed)',
      notes: 'Classic street photography setup'
    }
  },
  'macro': {
    'extreme-close-up': {
      camera: 'Canon EOS R5',
      lens: 'MP-E 65mm f/2.8 1-5x Macro',
      notes: 'Extreme magnification for tiny subjects'
    },
    'close-up': {
      camera: 'Olympus OM-D E-M1X',
      lens: '60mm f/2.8 Macro',
      notes: 'Excellent for insects and small objects'
    }
  }
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

const getCameraRecommendation = (style: string, shotType: string, depthOption: string = ''): CameraGear => {
  const defaultGear: CameraGear = {
    camera: 'Sony A7 III',
    lens: '24-70mm f/2.8',
    notes: 'Versatile all-purpose setup'
  };

  // Depth-specific recommendations for wide shots
  const depthGear: { [key: string]: CameraGear } = {
    'foreground-detail': {
      camera: 'Nikon D850',
      lens: '24-70mm f/2.8',
      notes: 'Excellent for foreground detail while maintaining background context'
    },
    'depth-of-field': {
      camera: 'Sony A7R IV',
      lens: '70-200mm f/2.8 GM',
      notes: 'Perfect for graduated depth of field control'
    },
    'background-emphasis': {
      camera: 'Canon EOS R5',
      lens: '85mm f/1.2 L',
      notes: 'Superior background rendering with subject separation'
    }
  };

  // If it's a wide-type shot and has depth option, prioritize depth-specific gear
  if (['extreme-wide', 'wide', 'full'].includes(shotType) && depthOption) {
    return depthGear[depthOption] || defaultGear;
  }

  // Otherwise use style and shot type specific recommendations
  const styleRecs = cameraRecommendations[style];
  if (!styleRecs) return defaultGear;

  const shotRec = styleRecs[shotType];
  if (!shotRec) {
    const firstShotType = Object.keys(styleRecs)[0];
    return styleRecs[firstShotType] || defaultGear;
  }

  return shotRec;
};

export default function PromptBuilder() {
  // Base states
  const [imageSize, setImageSize] = useState('landscape');
  const [aspectRatio, setAspectRatio] = useState('3:2');
  const [mode, setMode] = useState('raw');
  const [version, setVersion] = useState('6.1');
  const [stylization, setStylization] = useState(50);
  const [variety, setVariety] = useState(0);
  const [subject, setSubject] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('product');
  const [shotType, setShotType] = useState('close-up');
  const [cameraAngle, setCameraAngle] = useState('eye-level');
  const [lighting, setLighting] = useState('natural');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [tipAlert, setTipAlert] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const { updateBackground } = useBackground();

  const [depthOption, setDepthOption] = useState('');

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

  const getDepthDescription = (depthOption: string): string => {
    switch (depthOption) {
      case 'foreground-detail':
        return 'with detailed focus in the foreground';
      case 'depth-of-field':
        return 'with graduated depth of field from front to back';
      case 'background-emphasis':
        return 'with emphasis on the background and soft foreground';
      default:
        return '';
    }
  };

  const generatePrompt = () => {
    if (!subject) {
      setGeneratedPrompt('Please enter a subject first');
      return;
    }

    const gear = getCameraRecommendation(selectedStyle, shotType, depthOption);
    const depthDesc = getDepthDescription(depthOption);
    
    const promptParts = [
      subject,
      selectedCategory && selectedSubcategory ? `${selectedSubcategory} ${selectedCategory.toLowerCase()}` : '',
      `${selectedStyle} style photography`,
      `${shotType} shot`,
      depthDesc,
      `from ${cameraAngle} angle`,
      `captured with ${gear.camera} using ${gear.lens}`,
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
        {/* Main selections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Object Category Selection */}
          {/* Object Category Selection */}
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Object Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  {objectCategories.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => setSelectedCategory(cat.category)}
                      className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
                        selectedCategory === cat.category
                          ? 'bg-[#FFB768] text-white'
                          : 'bg-white hover:bg-[#FFB768]/10'
                      }`}
                    >
                      {cat.category === 'Person' && <i className="fas fa-user text-2xl" />}
                      {cat.category === 'Animal' && <i className="fas fa-paw text-2xl" />}
                      {cat.category === 'Product' && <i className="fas fa-box text-2xl" />}
                      {cat.category === 'Architecture' && <i className="fas fa-building text-2xl" />}
                      {cat.category === 'Nature' && <i className="fas fa-leaf text-2xl" />}
                      <span className="text-sm">{cat.category}</span>
                    </button>
                  ))}
                </div>

                {selectedCategory && (
                  <div className="mt-6">
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
          </div>

          {/* Photography Style */}
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

          {/* Shot Type */}
          <Card>
            <CardHeader variant="no-padding" />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <CardTitle className="text-sm mb-2">Shot Type</CardTitle>
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
                </div>

                {/* Only show for wide/landscape/full shots */}
                {(['extreme-wide', 'wide', 'full'].includes(shotType)) && (
                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-sm font-medium">Add Depth</span>
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

          {/* Camera Angle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Camera Angle</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={cameraAngle} onValueChange={setCameraAngle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select camera angle" />
                </SelectTrigger>
                <SelectContent>
                  {shotType && (
                    <>
                      <SelectGroup>
                        <SelectLabel>Suggested Angles</SelectLabel>
                        {getSuggestedAngles(shotType).suggested.map((angle) => (
                          <SelectItem 
                            key={angle.value} 
                            value={angle.value}
                            suggested={true}
                          >
                            {angle.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      
                      <SelectSeparator />
                      
                      <SelectGroup>
                        <SelectLabel>Other Angles</SelectLabel>
                        {getSuggestedAngles(shotType).others.map((angle) => (
                          <SelectItem 
                            key={angle.value} 
                            value={angle.value}
                          >
                            {angle.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </>
                  )}
                  {!shotType && (
                    // Show all angles without grouping if no shot type is selected
                    cameraAngles.map((angle) => (
                      <SelectItem 
                        key={angle.value} 
                        value={angle.value}
                      >
                        {angle.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Lighting */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Lighting</CardTitle>
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
        
        {/* Photography Suggestions */}
        {selectedStyle && photographySuggestions[selectedStyle] && (
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
                    <CardTitle className="text-sm">Image Size</CardTitle>
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
                        <div className="text-sm">Aspect Ratio: {aspectRatio}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Model Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Model Settings</CardTitle>
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
            className="btn-large rounded-[24px] p-6 text-lg font-semibold"
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

