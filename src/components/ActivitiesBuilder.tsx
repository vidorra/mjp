'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import activitiesSystem, { Activity } from '@/lib/unifiedActivitiesSystem';
import photographyPersonas, { isPersonaRecommended } from '@/lib/photographyPersonas';

interface ActivitiesBuilderProps {
  onActivitiesChange: (activities: string) => void;
  selectedPersona?: string;
}

export default function ActivitiesBuilder({ onActivitiesChange, selectedPersona }: ActivitiesBuilderProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  const [currentActivityId, setCurrentActivityId] = useState<string>('');

  // Generate activities description
  const generateActivitiesDescription = () => {
    const activityLabels = selectedActivityIds.map(id =>
      activitiesSystem.getActivityLabel(id) || ''
    ).filter(Boolean);
    
    const description = activityLabels.join(', ');
    onActivitiesChange(description);
    return description;
  };

  // Add activity to selected activities
  const addActivity = () => {
    if (currentActivityId && !selectedActivityIds.includes(currentActivityId)) {
      setSelectedActivityIds([...selectedActivityIds, currentActivityId]);
      setCurrentActivityId('');
    }
  };

  // Remove activity from selected activities
  const removeActivity = (activityId: string) => {
    setSelectedActivityIds(selectedActivityIds.filter(id => id !== activityId));
  };

  // Apply persona activity selections when persona changes
  useEffect(() => {
    if (selectedPersona) {
      const persona = photographyPersonas[selectedPersona];
      if (persona && persona.activitySelections) {
        // Get activities from selected categories
        const categoryActivities = (persona.activitySelections.categories || [])
          .flatMap(categoryId =>
            activitiesSystem.getCategoryActivities(categoryId).map(activity => activity.id)
          );
        
        // Add specifically selected activities
        const specificActivities = persona.activitySelections.activities || [];
        
        // Combine and remove duplicates
        const allActivities = [...new Set([...categoryActivities, ...specificActivities])];
        
        setSelectedActivityIds(allActivities);
      }
    }
  }, [selectedPersona]);

  // Update description when selected activities change
  useEffect(() => {
    generateActivitiesDescription();
  }, [selectedActivityIds]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activities & Actions</CardTitle>
        <CardDescription>Add actions and activities to your person</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Activity Category Selection */}
        <div>
          <label className="text-sm font-medium mb-1 block">Activity Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(activitiesSystem.categories).map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Activity Selection - Only show if category is selected */}
        {selectedCategory && (
          <div>
            <label className="text-sm font-medium mb-1 block">Activity</label>
            <div className="flex gap-2">
              <div className="flex-grow">
                <Select value={currentActivityId} onValueChange={setCurrentActivityId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {activitiesSystem.categories[selectedCategory]?.activities.map((activity) => (
                      <SelectItem key={activity.id} value={activity.id}>
                        {activity.label}
                        {selectedPersona && isPersonaRecommended(selectedPersona, activity.id) && (
                          <span className="ml-1 text-secondary" title="Recommended for selected persona">✓</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addActivity} disabled={!currentActivityId}>Add</Button>
            </div>
          </div>
        )}

        {/* Selected Activities */}
        {selectedActivityIds.length > 0 && (
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Selected Activities:</label>
            <div className="flex flex-wrap gap-2">
              {selectedActivityIds.map((activityId) => {
                const activityLabel = activitiesSystem.getActivityLabel(activityId);
                return (
                  <div key={activityId} className="px-3 py-1 bg-card rounded-full flex items-center gap-1 border border-border">
                    <span className="text-sm">{activityLabel}</span>
                    <button
                      onClick={() => removeActivity(activityId)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <i className="far fa-times-circle text-xs"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="mt-4 p-3 bg-muted rounded-md">
          <h4 className="text-sm font-medium mb-1">Activities Description:</h4>
          <p className="text-sm">{generateActivitiesDescription() || "No activities selected yet"}</p>
        </div>
      </CardContent>
    </Card>
  );
}