'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { contentCreationOptions, contentCreationCategories } from '@/lib/contentCreationData';

interface ContentCreationBuilderProps {
  onContentDetailsChange: (details: string) => void;
}

export default function ContentCreationBuilder({ onContentDetailsChange }: ContentCreationBuilderProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Generate content creation description
  const generateContentDescription = () => {
    const details = Object.values(selectedOptions).filter(Boolean).join(', ');
    onContentDetailsChange(details);
    return details;
  };

  // Update description when selected options change
  useEffect(() => {
    generateContentDescription();
  }, [selectedOptions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Creation</CardTitle>
        <CardDescription>Optimize for social media and content creation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Content Creation Categories */}
        {contentCreationCategories.map((category) => (
          <div key={category.id} className="mb-4">
            <label className="text-sm font-medium mb-1 block">{category.label}</label>
            <Select 
              value={selectedOptions[category.id] || ''} 
              onValueChange={(value) => setSelectedOptions({...selectedOptions, [category.id]: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${category.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {contentCreationOptions[category.id as keyof typeof contentCreationOptions]?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        {/* Preview */}
        <div className="mt-4 p-3 bg-muted rounded-md">
          <h4 className="text-sm font-medium mb-1">Content Creation Details:</h4>
          <p className="text-sm">{generateContentDescription() || "No content details selected yet"}</p>
        </div>
      </CardContent>
    </Card>
  );
}