'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from '@/components/ui/select';
import { CameraAngle, cameraAngles, getSuggestedAngles } from '@/types/photography';

interface CameraAngleSelectorProps {
  shotType: string;
  cameraAngle: string;
  setCameraAngle: (angle: string) => void;
  isAerialPhoto: boolean;
  setIsAerialPhoto: (isAerial: boolean) => void;
}

export default function CameraAngleSelector({
  shotType,
  cameraAngle,
  setCameraAngle,
  isAerialPhoto,
  setIsAerialPhoto
}: CameraAngleSelectorProps) {
  return (
    <Card>
      <CardHeader variant="no-padding" />
      <CardContent>
        <div className="flex gap-4 items-start">
          <div className={`min-w-[66%] flex flex-col items-start ${!['high-angle', 'birds-eye'].includes(cameraAngle) ? 'flex-grow' : ''}`}>
            <CardTitle className="text-sm mb-2">Camera Angle</CardTitle>
            <Select value={cameraAngle} onValueChange={(value) => {
              setCameraAngle(value);
              if (!['high-angle', 'birds-eye'].includes(value)) {
                setIsAerialPhoto(false);
              }
            }}>
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
          </div>

          {['high-angle', 'birds-eye'].includes(cameraAngle) && (
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium whitespace-nowrap">Aerial Photo</span>
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-[#FFB768] text-[#FFB768] focus:ring-[#FFB768] transition-colors cursor-pointer"
                checked={isAerialPhoto}
                onChange={(e) => setIsAerialPhoto(e.target.checked)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}