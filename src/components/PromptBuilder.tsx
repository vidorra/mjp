'use client';

import React, { useState, useEffect } from 'react';
import { useAdvancedMode } from '../contexts/AdvancedModeContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useBackground } from '../contexts/BackgroundContext';
import PromptOverlay from './PromptOverlay';
import EnhancedLighting, { LightingOptions } from './EnhancedLighting';
import PersonBuilder from './PersonBuilder';

// Import our new components
import CategorySelector from './CategorySelector';
import StyleSelector from './StyleSelector';
import ShotTypeSelector, { getSuggestedShotTypes } from './ShotTypeSelector';
import CameraAngleSelector from './CameraAngleSelector';
import AdvancedSettings from './AdvancedSettings';
import SuggestionPanel from './SuggestionPanel';
import { getCameraRecommendation, getDepthDescription } from './CameraRecommendation';

export default function PromptBuilder() {
  // Base states
  const [imageSize, setImageSize] = useState('landscape');
  const [aspectRatio, setAspectRatio] = useState('3:2');
  const [mode, setMode] = useState('raw');
  const [version, setVersion] = useState('6.1');
  const [stylization, setStylization] = useState(50);
  const [variety, setVariety] = useState(0);
  const [subject, setSubject] = useState('');
  const [personDetails, setPersonDetails] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('portrait');
  const [shotType, setShotType] = useState('extreme-close-up');
  
  // Reset depth option when switching to a shot type that doesn't support it
  useEffect(() => {
    if (!['extreme-wide', 'wide', 'full'].includes(shotType) && depthOption) {
      setDepthOption('');
    }
  }, [shotType]);
  
  const [cameraAngle, setCameraAngle] = useState('front-view');
  const [isAerialPhoto, setIsAerialPhoto] = useState(false);
  const { isAdvancedMode, setIsAdvancedMode } = useAdvancedMode();
  const [lighting, setLighting] = useState<LightingOptions>({
    type: 'natural'
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [tipAlert, setTipAlert] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const { updateBackground } = useBackground();

  const [depthOption, setDepthOption] = useState('');
  const [showPersonBuilder, setShowPersonBuilder] = useState(false);

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

    const gear = getCameraRecommendation(selectedStyle, shotType, depthOption);
    const depthDesc = getDepthDescription(depthOption);
    
    const promptParts = [
      subject,
      personDetails, // Add person details if available
      selectedCategory && selectedSubcategory ? `${selectedSubcategory} ${selectedCategory.toLowerCase()}` : '',
      `${selectedStyle} style photography`,
      `${shotType} shot`,
      depthDesc,
      `from ${cameraAngle} angle`,
      isAerialPhoto ? 'aerial photo' : '',
      `captured with ${gear.camera} using ${gear.lens}`,
      `${lighting.type} lighting${lighting.quality ? `, ${lighting.quality}` : ''}${lighting.shadows ? `, ${lighting.shadows}` : ''}${lighting.direction ? `, ${lighting.direction}` : ''}`
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

  // Auto-select first suggested shot type when photography style changes
  useEffect(() => {
    const suggestedShots = getSuggestedShotTypes(selectedStyle);
    if (suggestedShots.length > 0) {
      setShotType(suggestedShots[0]);
    }
  }, [selectedStyle]);

  useEffect(() => {
    updateBackground(selectedStyle, shotType, selectedCategory, selectedSubcategory, lighting);
  }, [selectedStyle, shotType, selectedCategory, selectedSubcategory, lighting, updateBackground]);

  return (
    <div className={`space-y-6 ml-auto ${isAdvancedMode ? 'max-w-[1032px]' : 'max-w-[688px]'} transition-all duration-300`}>
      <div className="flex justify-end">
        <button
          onClick={() => setIsAdvancedMode(!isAdvancedMode)}
          className="text-sm text-[#FFB768] hover:text-[#FFB768]/80 transition-colors font-medium"
        >
          {isAdvancedMode ? 'Switch to Basic Mode' : 'Switch to Advanced Mode'}
        </button>
      </div>
      <div className="relative">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What will you imagine?"
          className="input-glass"
        />
      </div>
      
      {/* Main content area with flex layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main card with flex-grow */}
        <div className="backdrop-blur-lg bg-white rounded-[24px] shadow-lg p-6 text-foreground flex-grow">
          {/* Main selections grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Object Category Selection */}
            <CategorySelector 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
              isAdvancedMode={isAdvancedMode}
              showPersonBuilder={showPersonBuilder}
              setShowPersonBuilder={setShowPersonBuilder}
            />

            {/* Photography Style */}
            <StyleSelector 
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
            />

            {/* Lighting Controls */}
            {isAdvancedMode ? (
              <EnhancedLighting value={lighting} onChange={setLighting} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Lighting</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={lighting.type} onValueChange={(value) => setLighting({ ...lighting, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lighting" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { value: 'natural', label: 'Natural Lighting' },
                        { value: 'studio', label: 'Studio Lighting' },
                        { value: 'golden-hour', label: 'Golden Hour' },
                        { value: 'blue-hour', label: 'Blue Hour' },
                        { value: 'fluorescent', label: 'Fluorescent Lighting' }
                      ].map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Shot Type */}
            <ShotTypeSelector 
              selectedStyle={selectedStyle}
              shotType={shotType}
              setShotType={setShotType}
              depthOption={depthOption}
              setDepthOption={setDepthOption}
            />

            {/* Camera Angle */}
            <CameraAngleSelector 
              shotType={shotType}
              cameraAngle={cameraAngle}
              setCameraAngle={setCameraAngle}
              isAerialPhoto={isAerialPhoto}
              setIsAerialPhoto={setIsAerialPhoto}
            />
          </div>
          
          {/* Photography Suggestions */}
          <SuggestionPanel 
            selectedStyle={selectedStyle}
            setSubject={setSubject}
            tipAlert={tipAlert}
            setTipAlert={setTipAlert}
          />

          {/* Advanced Settings Section */}
          <AdvancedSettings 
            isAdvancedOpen={isAdvancedOpen}
            setIsAdvancedOpen={setIsAdvancedOpen}
            imageSize={imageSize}
            setImageFormat={setImageFormat}
            mode={mode}
            setMode={setMode}
            stylization={stylization}
            setStylization={setStylization}
            variety={variety}
            setVariety={setVariety}
            aspectRatio={aspectRatio}
          />

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
            <Alert className="mt-6 relative">
              <div className="flex justify-between items-center">
                <AlertTitle>Generated Prompt:</AlertTitle>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedPrompt);
                    alert('Prompt copied to clipboard!');
                  }}
                  className="text-primary hover:text-primary/80 transition-colors"
                  title="Copy to clipboard"
                >
                  <i className="far fa-copy"></i>
                </button>
              </div>
              <AlertDescription className="mt-2 text-sm break-words">
                {generatedPrompt}
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        {/* Person Builder Card - Only show when button is clicked and in Advanced Mode */}
        {showPersonBuilder && isAdvancedMode && selectedCategory === 'Person' && (
          <div className="backdrop-blur-lg bg-white rounded-[24px] shadow-lg p-6 text-foreground flex-grow md:max-w-[400px]">
            <PersonBuilder onPersonDetailsChange={setPersonDetails} />
          </div>
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

// Import the Card components for the basic lighting control
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
