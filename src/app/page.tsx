import Link from 'next/link';
import VerticalPhotoSmallStack from '../components/VerticalPhotoSmallStack';

export default function Home() {
  const photos = [
    {
      id: 1,
      src: '/close-up-male.webp',
      alt: 'Close up portrait'
    },
    {
      id: 2,
      src: '/street.webp',
      alt: 'Street photography'
    },
    {
      id: 3,
      src: '/mauritanian-male.webp',
      alt: 'Mauritanian male portrait'
    },
    {
      id: 4,
      src: '/watching-ipad.webp',
      alt: 'Person watching iPad'
    },
    {
      id: 5,
      src: '/bg.webp',
      alt: 'Close up portrait'
    }
  ];

  return (
    <div className="min-h-screen relative bg-background">
      {/* Hero Section */}
      <section className="h-screen relative z-0">
        {/* Centered Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center max-w-xl bg-background backdrop-blur-sm rounded-xl p-8">
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-foreground font-semibold mb-6">
              Create Perfect
              <br />
              <span className="gradient-text">Photo Prompts</span>
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.5rem)] leading-[1.4] mb-8 text-gray-600">
              Generate professional photography prompts with our intuitive tool. Perfect for photographers, artists, and creators.
            </p>
            <Link
              href="/tool"
              className="btn-large font-semibold text-[clamp(0.875rem,1vw,1.125rem)] bg-primary inline-flex items-center gap-2 w-fit mx-auto"
            >
              <i className="far fa-sparkles"></i>
              Create Prompts
            </Link>
          </div>
        </div>

        {/* Photo Stack */}
        <div className="absolute inset-0">
          <VerticalPhotoSmallStack photos={photos} containerHeight={3000} />
        </div>
      </section>

      {/* Gradient Section */}
      <section className="h-screen bg-background relative z-0 p-20">
        <div
          className="h-full rounded-32 overflow-hidden"
          style={{ background: 'radial-gradient(100.18% 100.18% at 50% -0.18%, var(--secondary) 0%, var(--primary) 100%)' }}
        >
          <div className="grid grid-cols-12 gap-8 h-full p-12">
            <div className="col-span-5">
              <div className="text-white pr-4">
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal mb-6 leading-[1.1]">
                    Create Perfect
                    <br />
                    Photo Prompts
                </h2>
                <p className="text-[clamp(1rem,1.5vw,1.5rem)] leading-[1.4] opacity-90">
                  Our advanced tools and intuitive interface help you create stunning visuals that capture the perfect moment, every time.
                </p>  
              </div>  
            </div>
            <div className="col-span-7 grid grid-cols-2 gap-8 items-center">
              {/* Left Column - Text */}
             
              <div className="flex flex-col gap-4">
              <div className="border-white border-[4px] rounded-xl shadow-lg">
                <img src="/horizontal-facecream-add.webp" alt="Close up portrait" className="w-full rounded-xl shadow-lg" />
              </div>
                <div className="border-white border-[4px] rounded-xl shadow-lg">
                  <img src="/tennis-player.webp" alt="Eye detail" className="w-full rounded-xl shadow-lg" />
                </div>
              </div>
              
              {/* Right Column - Images */}
              <div className="flex flex-col gap-4">
                <div className="border-white border-[4px] rounded-xl shadow-lg">
                  <img src="/vertical-facecream-add.webp" alt="Close up portrait" className="w-full rounded-xl  " />

                </div>
                <div className="border-white border-[4px] rounded-xl shadow-lg">
                  <img src="/bird.webp" alt="Tennis player" className="w-full rounded-xl shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white z-20 relative">
        {/* Categories Section */}
        <section className="px-12 py-16 bg-white container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
            {photos.map((photo, index) => (
              <img
                key={photo.id || index}
                src={photo.src}
                alt={photo.alt}
                className="w-full rounded-xl"
              />
            ))}
          </div>
          <div className="mt-16">
            <h2 className="text-4xl font-semibold text-center">
              We make waves of fun & joy for your next shot
            </h2>
            <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
              we work on creative sanctuary, dive into the season's hottest and unforgettable adventures!
            </p>
            <div className="flex items-center justify-center mt-2">
              <span className="text-xs text-primary ml-3">photography-dreams</span>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-12 py-16 bg-gradient-to-b">
          <div className="grid grid-cols-2 gap-8 container">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Smart Camera Selection</h3>
                <div className="flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="#FB8654" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="#FB8654" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Transform your shoot with a professional lens selection based on your chosen style and requirements.
              </p>
              <div className="mt-auto">
                <div className="flex space-x-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-primary flex items-center justify-center text-white text-xs">
                      <i className="far fa-camera"></i>
                    </div>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-primary flex items-center justify-center text-white text-xs">
                      <i className="far fa-camera"></i>
                    </div>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-primary flex items-center justify-center text-white text-xs">
                      <i className="far fa-camera"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-md p-6 flex flex-col bg-white container">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Lighting Mastery</h3>
                <div className="flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="#FB8654" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="#FB8654" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Choose from various lighting setups to enhance your images with the perfect atmosphere.
              </p>
              <div className="mt-auto bg-white container">
                <div className="flex space-x-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-primary flex items-center justify-center text-white text-xs">
                      <i className="far fa-lightbulb-on"></i>
                    </div>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-primary flex items-center justify-center text-white text-xs">
                      <i className="far fa-lightbulb-on"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Outputs Section */}
        <section className="px-12 py-16 container mx-auto">
          <div className="flex justify-between items-center">
            {/* Left side with text */}
            <div className="w-1/4 pr-8">
              <h2 className="text-4xl font-semibold mb-4">
                Example Outputs
              </h2>
              <p className="text-gray-600 mb-8">
                Our passion for creating stunning photo prompts means every result is a masterpiece of detail. Get ready for perfect shots with vivid details and professional flair.
              </p>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm flex items-center">
                Learn more
              </button>
            </div>

            {/* Right side with dark container */}
            <div className="w-2/3">
              <div className="bg-gray-900 rounded-2xl">
                {/* Main content area with grid */}
                <div className="p-8 grid grid-cols-10 gap-6">
                  {/* First column for floating card */}
                  <div className="col-span-2 relative">
                    <div className="absolute w-[200%] h-full right-0 top-0">
                      <div className="bg-background rounded-xl p-6 w-full h-full flex flex-col justify-center">
                        <h3 className="text-lg font-medium mb-2">Perfect Prompts</h3>
                        <p className="text-sm text-gray-600">
                          Join our expert team for the perfect photography prompt experience.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image columns */}
                  <div className="col-span-4 rounded-xl overflow-hidden">
                    <img src="/close-up-male.webp" alt="Close up portrait" className="w-full h-64 object-cover" />
                  </div>
                  <div className="col-span-4 rounded-xl overflow-hidden">
                    <img src="/face-cream.webp" alt="Face cream product" className="w-full h-64 object-cover" />
                  </div>
                </div>
                
                {/* Bottom bar */}
                <div className="px-8 py-4 border-t border-gray-800 flex justify-between items-center">
                  <div className="text-white text-lg">Summer events</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-white text-sm">2/30</div>
                    <span className="text-white opacity-60">•••</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="px-12 py-16 bg-gradient-to-r from-primary to-orange-400 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Start Creating Professional Prompts Today
              </h2>
              <p className="text-white/90 mb-6 max-w-xl">
                Join thousands of creators who are generating stunning AI images with our photography-focused prompt builder.
              </p>
              <Link
                href="/tool"
                className="bg-white text-primary px-8 py-3 rounded-full flex items-center"
              >
                Try It Now - It's Free
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            
            <div className="w-1/3 relative">
              <div className="absolute -top-24 -right-8">
                <img src="/eye-male.webp" alt="Eye detail shot" className="w-64 h-80 object-cover rounded-xl shadow-lg" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}