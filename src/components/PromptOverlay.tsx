// components/PromptOverlay.tsx
import React from 'react';
import { findMatchingImage, getHighlightedWords, type BackgroundImage } from '../lib/backgroundData';
import { LightingOptions } from './EnhancedLighting';

type PromptOverlayProps = {
    style?: string;
    shotType?: string;
    category?: string;
    subcategory?: string;
    lighting?: LightingOptions;
};

const PromptOverlay = ({ 
    style, 
    shotType, 
    category, 
    subcategory, 
    lighting 
}: PromptOverlayProps) => {
    console.log('PromptOverlay mounted');
    console.log('Received props:', { style, shotType, category, subcategory, lighting });

    const matchingImage = findMatchingImage(style, shotType, category, subcategory, lighting?.type);
    console.log('Found matching image:', matchingImage);

    const highlightWords = getHighlightedWords(
        matchingImage.prompt,
        style,
        shotType,
        category,
        subcategory,
        lighting?.type
    );

    console.log('Words to highlight:', highlightWords);

    const words = matchingImage.prompt.split(' ');

    return (
        <div className="fixed bottom-12 left-12  left-0 w-50 rounded-[24px]  bg-black/50 backdrop-blur-sm p-4 z-50">
            <h4 className="text-white font-semibold mb-2"><i className="far fa-sparkles mr-2"></i>Smart match</h4>
            <p className="text-gray-400 font-mono text-sm max-w-4xl mx-auto">
                {words.map((word, index) => {
                    const shouldHighlight = highlightWords.some(
                        hw => word.toLowerCase().includes(hw.toLowerCase())
                    );
          
                    console.log(`Word "${word}": ${shouldHighlight ? 'highlighted' : 'not highlighted'}`);
          
                    return (
                        <React.Fragment key={index}>
                        
                            <span 
                                className={`${
                                    shouldHighlight ? 'text-white font-medium' : 'text-gray-400'
                                } transition-colors duration-200`}
                            >
                                {word}
                            </span>{' '}
                        </React.Fragment>
                    );
                })}
            </p>
        </div>
    );
};

export default PromptOverlay;