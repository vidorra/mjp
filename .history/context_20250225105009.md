# Midjourney Prompt Generator

## Project Overview

This project is a web-based tool designed to help users generate high-quality, detailed prompts for Midjourney, an AI image generation service. The application provides a structured interface that guides users through creating effective prompts by selecting various photography parameters like style, shot type, camera angle, and lighting conditions.

## Key Features

1. **Structured Prompt Building**: Guides users to select appropriate parameters for their desired image, including:
   - Object categories and subcategories (Person, Animal, Product, Architecture, Nature)
   - Photography styles (Product, Portrait, Landscape, Street, Macro)
   - Shot types (Extreme Wide, Wide, Full, Medium, Close-Up, Extreme Close-Up, Macro)
   - Camera angles (Front View, Side View, Three-Quarter, Eye Level, High Angle, Low Angle, Bird's Eye, etc.)
   - Lighting conditions (Natural, Studio, Golden Hour, Blue Hour, Fluorescent)

2. **Visual Context**: Changes the background image to match the selected parameters, providing visual context for the prompt being built.

3. **Camera and Lens Recommendations**: Suggests optimal camera gear based on the selected photography style and shot type to enhance technical accuracy.

4. **Smart Suggestions**: Offers contextual suggestions based on the selected photography style to help users enrich their prompts with relevant details.

5. **Advanced Settings**: Allows fine-tuning of parameters like:
   - Image size and aspect ratio
   - Midjourney version selection
   - Stylization level
   - Variety/chaos settings

6. **Depth Description Options**: For wide-angle shots, provides options to specify depth characteristics (foreground detail, graduated depth of field, background emphasis).

## Technical Implementation

The application is built using:

- **Next.js** with TypeScript for the frontend framework
- **React Context API** for state management
- **Tailwind CSS** for styling
- **Shadcn UI components** for consistent interface elements

### Core Components

1. **PromptBuilder**: The main component that contains all the user interface elements for building prompts. It manages state for all the parameters and generates the final prompt string.

2. **BackgroundContext**: A React context that manages the background image display based on selected parameters.

3. **PromptOverlay**: Shows the current background image's original prompt with highlighted terms that match the user's selections, helping users understand how different parameters affect the final prompt.

### Data Structures

The application uses several key data structures:

1. **Object Categories**: Hierarchical categories and subcategories for subjects
2. **Photography Styles**: Various photography styles with associated parameters
3. **Shot Types**: Different framing options for photographs
4. **Camera Angles**: Various perspective options with descriptions and suggestions for specific shot types
5. **Background Images**: A collection of example images with associated prompts and tags for visual context

## How It Works

1. Users input their subject and select parameters from the available options
2. The background dynamically changes to match their selections, providing visual context
3. Camera gear recommendations update based on selected style and shot type
4. When ready, the user clicks "Generate Prompt" to create a formatted prompt for Midjourney
5. The generated prompt includes all selected parameters and Midjourney-specific settings (aspect ratio, stylization, etc.)

## Features for Future Development

1. **Prompt History**: Save and recall previously generated prompts
2. **Image Gallery**: Display generated images with their prompts for reference
3. **User Accounts**: Allow users to save their preferences and prompts
4. **Direct Integration**: Send prompts directly to Midjourney's API
5. **Advanced Parameters**: Support for more advanced Midjourney parameters like image weights
6. **Template System**: Create and save prompt templates for consistent style generation
7. **Community Sharing**: Allow users to share effective prompts with others