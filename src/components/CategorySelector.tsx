'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types
type ObjectCategory = {
  category: string;
  subcategories: string[];
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
    category: 'Architecture & Interiors',
    subcategories: ['Residential Interior', 'Commercial Interior', 'Building Exterior', 'Urban Architecture', 'Architectural Details']
  },
  {
    category: 'Nature',
    subcategories: ['Landscape', 'Seascape', 'Mountain', 'Forest', 'Desert', 'Weather']
  }
];

interface CategorySelectorProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (subcategory: string) => void;
  isAdvancedMode: boolean;
  showPersonBuilder: boolean;
  setShowPersonBuilder: (show: boolean) => void;
}

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  isAdvancedMode,
  showPersonBuilder,
  setShowPersonBuilder
}: CategorySelectorProps) {
  return (
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
                className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border ${
                  selectedCategory === cat.category
                    ? 'bg-[#FFB768]/10 border-secondary'
                    : 'bg-white hover:bg-[#FFB768]/10 border-transparent'
                }`}
              >
                {cat.category === 'Person' && <i className="far fa-user text-2xl" />}
                {cat.category === 'Animal' && <i className="far fa-dog text-2xl" />}
                {cat.category === 'Product' && <i className="far fa-box-open text-2xl" />}
                {cat.category === 'Architecture & Interiors' && <i className="far fa-building text-2xl" />}
                {cat.category === 'Nature' && <i className="far fa-tree text-2xl" />}
                <span className="text-sm">{cat.category}</span>
              </button>
            ))}
          </div>

          {selectedCategory && (
            <div className="mt-6 flex items-center gap-2">
              <div className="flex-grow">
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
              
              {/* Person Builder Button - Only show when Person category is selected and in Advanced Mode */}
              {selectedCategory === 'Person' && isAdvancedMode && (
                <Button
                  onClick={() => setShowPersonBuilder(!showPersonBuilder)}
                  className="ml-2 bg-[#FFB768] hover:bg-[#FFB768]/90 text-white"
                  size="sm"
                >
                  {showPersonBuilder ? 'Hide Person Builder' : 'Show Person Builder'}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}