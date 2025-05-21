'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdvancedSettingsProps {
  isAdvancedOpen: boolean;
  setIsAdvancedOpen: (isOpen: boolean) => void;
  imageSize: string;
  setImageFormat: (format: string) => void;
  mode: string;
  setMode: (mode: string) => void;
  stylization: number;
  setStylization: (value: number) => void;
  variety: number;
  setVariety: (value: number) => void;
  aspectRatio: string;
}

export default function AdvancedSettings({
  isAdvancedOpen,
  setIsAdvancedOpen,
  imageSize,
  setImageFormat,
  mode,
  setMode,
  stylization,
  setStylization,
  variety,
  setVariety,
  aspectRatio
}: AdvancedSettingsProps) {
  return (
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
  );
}