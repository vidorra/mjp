import Link from 'next/link';
import VerticalPhotoStack from '../components/VerticalPhotoStack';

export default function Home() {
  const photos = [
    {
      id: 1,
      src: '/close-up-male.webp',
      alt: 'Close up portrait'
    },
    {
      id: 2,
      src: '/bg.webp',
      alt: 'Background landscape'
    },
    {
      id: 3,
      src: '/eye-male.webp',
      alt: 'Eye detail shot'
    },
    {
      id: 4,
      src: '/birdseye-view-amsterdam.webp',
      alt: 'Birds eye view'
    },
    {
      id: 5,
      src: '/street.webp',
      alt: 'Street photography'
    }
  ];

  // Add these three array definitions
  const featureCards = [
    {
      icon: "far fa-camera",
      title: "Smart Camera Selection",
      description: "Get tailored camera and lens recommendations based on your chosen style and shot type."
    },
    {
      icon: "far fa-lightbulb-on",
      title: "Lighting Mastery",
      description: "Choose from various lighting setups to enhance your images with the perfect atmosphere."
    },
    {
      icon: "far fa-compass",
      title: "Dynamic Angles",
      description: "Explore different perspectives with our comprehensive camera angle suggestions."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Choose Your Subject",
      description: "Select from various categories or enter your own subject."
    },
    {
      number: "2",
      title: "Pick Your Style",
      description: "Choose from portrait, product, landscape, and more."
    },
    {
      number: "3",
      title: "Customize Settings",
      description: "Fine-tune angles, lighting, and technical parameters."
    },
    {
      number: "4",
      title: "Generate & Create",
      description: "Get your optimized prompt and start creating."
    }
  ];

  const exampleOutputs = [
    {
      image: "/close-up-male.webp",
      title: "Portrait Photography",
      description: "Close-up portrait of a man, Canon EF 85mm f/1.4L, natural lighting, eye-level angle"
    },
    {
      image: "/face-cream.webp",
      title: "Product Photography",
      description: "Cosmetic product shot, Sony A7R IV with 90mm Macro, studio lighting setup"
    },
    {
      image: "/Grain_field_Hight_Angle.webp",
      title: "Landscape Photography",
      description: "Aerial view of grain field, Nikon D850 with 14-24mm f/2.8, golden hour lighting"
    }
  ];

  return (
    <div className="min-h-screen relative"> 
      {/* Hero Section */}
      <section className="h-screen flex relative z-0">
        {/* Left Content */}
        <div className="w-[540px] flex flex-col justify-center pl-8 lg:pl-16">
          <h1 className="text-5xl lg:text-7xl text-foreground font-medium mb-6">
            Create Perfect
            <br />
            <span className="text-primary">Photo Prompts</span> 
          </h1>
          <p className="text-lg mb-8 text-gray-600 max-w-xl">
            Generate professional photography prompts with our intuitive tool. Perfect for photographers, artists, and creators.
          </p>
          <Link
            href="/tool"
            className="btn-large font-semibold text-sm bg-primary inline-flex items-center gap-2 w-fit"
          >
            <i class="far fa-sparkles"></i>
            Create Prompts
             
          </Link>
        </div>

        {/* Right Photo Stack */}
        <div className="flex-1 relative">
          <VerticalPhotoStack photos={photos} containerHeight={3000} />
        </div>
      </section>


<div className="w-full h-20 inline-block from-transparent to-white z-20 relative"></div>
<div className=" bg-white z-20 relative">
  {/* Categories Section */}
  
  <section className="px-12 py-16 bg-white container">
    
    <div className="grid grid-cols-5 gap-6">
      {photos.map((photo, index) => (
        <div key={photo.id || index} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <div className="h-48 bg-gray-100">
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Features Grid */}
  <section className="px-12 py-16 bg-gradient-to-b ">
    <div className="mb-16">
      <h2 className="text-4xl font-semibold text-center">
        We make waves of fun & joy for your next shot
      </h2>
      <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
        we work on creative sanctuary, dive into the season's hottest and unforgettable adventures!
      </p>
      <div className="flex items-center justify-center mt-2">
        <span className="h-2 w-2 bg-primary rounded-full"></span>
        <span className="h-px w-16 bg-orange-300 ml-2"></span>
        <span className="text-xs text-gray-500 ml-3">photography-dreams</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-8  container">
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
  <div className="flex">
    {/* Left side with text */}
    <div className="w-1/3 pr-8">
      <h2 className="text-4xl font-semibold mb-4">
        Example Outputs
      </h2>
      <p className="text-gray-600 mb-8">
        Our passion for creating stunning photo prompts means every result is a masterpiece of detail. Get ready for perfect shots with vivid details and professional flair.
      </p>
      <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm flex items-center">
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    {/* Right side with dark container */}
    <div className="w-2/3">
      <div className="bg-gray-900 rounded-2xl ">
        {/* Main content area with grid */}
        <div className="p-8 grid grid-cols-10 gap-6">
          {/* First column for floating card */}
          <div className="col-span-2 relative">
            <div className="absolute w-[200%] h-full -left-24 top-0">
              <div className="bg-background rounded-xl p-6 w-64 h-full">
                <h3 className="text-lg font-medium mb-2">Perfect Prompts</h3>
                <p className="text-sm text-gray-600">
                  Join our expert team for the perfect photography prompt experience.
                </p>
              </div>
            </div>
          </div>
          
          {/* Image columns */}
          <div className="col-span-4 rounded-xl overflow-hidden">
            <img src={exampleOutputs[0].image} alt={exampleOutputs[0].title} className="w-full h-64 object-cover" />
          </div>
          <div className="col-span-4 rounded-xl overflow-hidden">
            <img src={exampleOutputs[1].image} alt={exampleOutputs[1].title} className="w-full h-64 object-cover" />
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
  <section className="px-12 py-16 bg-gradient-to-r from-primary to-orange-400 text-white ">
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
          <img src={photos[2].src} alt={photos[2].alt} className="w-64 h-80 object-cover rounded-xl shadow-lg" />
        </div>
      </div>
    </div>
  </section>
  </div>
    </div>
  );
}