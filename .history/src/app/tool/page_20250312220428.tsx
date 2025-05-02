'use client';

import dynamic from 'next/dynamic';
import { useBackground } from '@/contexts/BackgroundContext';

const PromptBuilder = dynamic(() => import('@/components/PromptBuilder'), {
  ssr: false
});

export default function ToolPage() {
  const { currentBackground } = useBackground();

  return (
    <>
      {/* Hero Section with Tool */}
      <section
        className="min-h-screen p-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${currentBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="container mx-auto relative flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 text-white pt-12">
            <h1 className="text-5xl font-bold mb-4">
              Create Perfect Midjourney Prompts
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Generate professional-quality prompts with our advanced photography-focused tool. Get expert camera, lens, and lighting recommendations.
            </p>
          </div>
          <div className="lg:w-1/2 max-w-[640px]">
            <PromptBuilder />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features for Perfect Prompts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="h-12 w-12 bg-[#FFB768] rounded-full flex items-center justify-center mb-4">
                <i className="far fa-camera text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Camera Selection</h3>
              <p className="text-gray-600">Get tailored camera and lens recommendations based on your chosen style and shot type.</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="h-12 w-12 bg-[#FFB768] rounded-full flex items-center justify-center mb-4">
                <i className="far fa-lightbulb-on text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lighting Mastery</h3>
              <p className="text-gray-600">Choose from various lighting setups to enhance your images with the perfect atmosphere.</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="h-12 w-12 bg-[#FFB768] rounded-full flex items-center justify-center mb-4">
                <i className="far fa-compass text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dynamic Angles</h3>
              <p className="text-gray-600">Explore different perspectives with our comprehensive camera angle suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-[#FFB768] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Your Subject</h3>
              <p className="text-gray-600">Select from various categories or enter your own subject.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-[#FFB768] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pick Your Style</h3>
              <p className="text-gray-600">Choose from portrait, product, landscape, and more.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-[#FFB768] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customize Settings</h3>
              <p className="text-gray-600">Fine-tune angles, lighting, and technical parameters.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-[#FFB768] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Generate & Create</h3>
              <p className="text-gray-600">Get your optimized prompt and start creating.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Advanced Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Professional Controls</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="far fa-check-circle text-[#FFB768] mt-1 mr-2"></i>
                  <span>Fine-tune image dimensions with aspect ratio controls</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-check-circle text-[#FFB768] mt-1 mr-2"></i>
                  <span>Adjust stylization levels for perfect artistic control</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-check-circle text-[#FFB768] mt-1 mr-2"></i>
                  <span>Control image variety with chaos settings</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Smart Suggestions</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="far fa-check-circle text-[#FFB768] mt-1 mr-2"></i>
                  <span>Get style-specific photography element suggestions</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-check-circle text-[#FFB768] mt-1 mr-2"></i>
                  <span>Receive optimal camera and lens recommendations</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-check-circle text-[#FFB768] mt-1 mr-2"></i>
                  <span>Access curated shot type suggestions for each style</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}