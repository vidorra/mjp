// components/PromptOverlay.tsx
import React from 'react';
import { findMatchingImage, getHighlightedWords, type BackgroundImage } from '../lib/backgroundData';
import { LightingOptions } from './EnhancedLighting';
import { useAdvancedMode } from '../contexts/AdvancedModeContext';

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
    const { isAdvancedMode } = useAdvancedMode();
    
    // Calculate the overlay width based on the advanced mode state, accounting for spacing
    const overlayWidthClass = isAdvancedMode
        ? "w-[calc(100%-1080px-32px)]" // Match header width in advanced mode minus 32px
        : "w-[calc(100%-720px-32px)]"; // Match header width in basic mode minus 32px
    
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
        <div className={`fixed bottom-6 left-6 ${overlayWidthClass} rounded-[24px] bg-black/50 backdrop-blur-sm p-4 z-50 transition-all duration-300`}>
            <h4 className="text-white font-semibold mb-2"><i className="far fa-sparkles mr-2"></i>Smart match</h4>
            <p className="text-gray-400 font-mono text-sm">
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