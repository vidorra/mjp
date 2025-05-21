'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LivePromptPreviewProps {
  prompt: string;
  sections: {
    title: string;
    content: string;
    color?: string;
  }[];
}

export default function LivePromptPreview({ prompt, sections }: LivePromptPreviewProps) {
  // Function to copy prompt to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    alert('Prompt copied to clipboard!');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">Live Prompt Preview</CardTitle>
        <Button 
          onClick={copyToClipboard} 
          variant="ghost" 
          size="sm"
          className="h-8 px-2 text-muted-foreground"
          title="Copy to clipboard"
        >
          <i className="far fa-copy mr-1"></i>
          Copy
        </Button>
      </CardHeader>
      <CardContent>
        {/* Full prompt preview */}
        <div className="p-3 bg-muted rounded-md mb-4 text-sm break-words">
          {prompt || "Your prompt will appear here as you make selections"}
        </div>

        {/* Sections breakdown */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Prompt Breakdown:</h4>
          
          {sections.map((section, index) => (
            section.content ? (
              <div key={index} className="text-xs">
                <span className="font-medium">{section.title}: </span>
                <span 
                  className="rounded px-1 py-0.5" 
                  style={{ backgroundColor: section.color || 'rgba(255, 183, 104, 0.1)' }}
                >
                  {section.content}
                </span>
              </div>
            ) : null
          ))}
        </div>
      </CardContent>
    </Card>
  );
}