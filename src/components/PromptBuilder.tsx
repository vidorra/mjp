'use client';

import React, { useState, useEffect } from 'react';
import { useAdvancedMode } from '../contexts/AdvancedModeContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useBackground } from '../contexts/BackgroundContext';
import PromptOverlay from './PromptOverlay';
import EnhancedLighting, { LightingOptions } from './EnhancedLighting';
import PersonBuilder from './PersonBuilder';
import ActivitiesBuilder from './ActivitiesBuilder';
import ContentCreationBuilder from './ContentCreationBuilder';
import LivePromptPreview from './LivePromptPreview';

// Import our new components
import CategorySelector from './CategorySelector';
import StyleSelector from './StyleSelector';
import ShotTypeSelector, { getSuggestedShotTypes } from './ShotTypeSelector';
import CameraAngleSelector from './CameraAngleSelector';
import AdvancedSettings from './AdvancedSettings';
import SuggestionPanel from './SuggestionPanel';
import { getCameraRecommendation, getDepthDescription } from './CameraRecommendation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [activities, setActivities] = useState('');
  const [contentDetails, setContentDetails] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('portrait');
  const [shotType, setShotType] = useState('extreme-close-up');
  const [selectedPersona, setSelectedPersona] = useState<string>('');
  
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
      activities, // Add activities if available
      contentDetails, // Add content creation details if available
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

          {/* Live Prompt Preview */}
          {generatedPrompt && (
            <div className="mt-6">
              <LivePromptPreview
                prompt={generatedPrompt}
                sections={[
                  { title: 'Subject', content: subject, color: 'rgba(255, 183, 104, 0.1)' },
                  { title: 'Person', content: personDetails, color: 'rgba(104, 211, 255, 0.1)' },
                  { title: 'Activities', content: activities, color: 'rgba(104, 255, 130, 0.1)' },
                  { title: 'Content', content: contentDetails, color: 'rgba(255, 104, 195, 0.1)' },
                  { title: 'Category', content: selectedCategory && selectedSubcategory ? `${selectedSubcategory} ${selectedCategory.toLowerCase()}` : '', color: 'rgba(255, 234, 104, 0.1)' },
                  { title: 'Style', content: `${selectedStyle} style photography`, color: 'rgba(186, 104, 255, 0.1)' },
                  { title: 'Shot', content: `${shotType} shot${depthOption ? ` with ${depthOption}` : ''}`, color: 'rgba(255, 104, 104, 0.1)' },
                  { title: 'Angle', content: `from ${cameraAngle} angle${isAerialPhoto ? ', aerial photo' : ''}`, color: 'rgba(104, 255, 213, 0.1)' },
                  { title: 'Camera', content: `captured with ${getCameraRecommendation(selectedStyle, shotType, depthOption).camera} using ${getCameraRecommendation(selectedStyle, shotType, depthOption).lens}`, color: 'rgba(177, 255, 104, 0.1)' },
                  { title: 'Lighting', content: `${lighting.type} lighting${lighting.quality ? `, ${lighting.quality}` : ''}${lighting.shadows ? `, ${lighting.shadows}` : ''}${lighting.direction ? `, ${lighting.direction}` : ''}`, color: 'rgba(255, 162, 104, 0.1)' }
                ]}
              />
            </div>
          )}
        </div>
        
        {/* Person Builder Card - Only show when button is clicked and in Advanced Mode */}
        {showPersonBuilder && isAdvancedMode && selectedCategory === 'Person' && (
          <div className="backdrop-blur-lg bg-white rounded-[24px] shadow-lg p-6 text-foreground flex-grow md:w-[400px] md:min-w-[400px] space-y-6">
            <PersonBuilder
              key={selectedSubcategory} // Add key to force re-render when gender changes
              onPersonDetailsChange={(details) => {
                setPersonDetails(details);
                // Extract persona name if it's in the details
                const personaMatch = details.match(/^(Instagram Model|Corporate Professional|Fitness Enthusiast|Creative Artist|Content Creator|Business Executive|Casual Portrait)/);
                if (personaMatch && personaMatch[1]) {
                  setSelectedPersona(personaMatch[1]);
                }
              }}
              gender={selectedSubcategory === 'Male' ? 'male' : selectedSubcategory === 'Female' ? 'female' : selectedSubcategory === 'Other' ? 'other' : ''}
            />
            
            <ActivitiesBuilder
              onActivitiesChange={setActivities}
              selectedPersona={selectedPersona}
            />
            
            {/* Only show Content Creation Builder for certain subcategories */}
            {(selectedSubcategory === 'Male' || selectedSubcategory === 'Female' || selectedSubcategory === 'Other') && (
              <ContentCreationBuilder onContentDetailsChange={setContentDetails} />
            )}
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
