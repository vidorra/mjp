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
            className="btn-large inline-flex items-center gap-2 w-fit"
          >
            Create Prompts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Right Photo Stack */}
        <div className="flex-1 relative">
          <VerticalPhotoStack photos={photos} containerHeight={3000} />
        </div>
      </section>

    {/* Features Section */}
<section className="px-12 py-16 bg-gradient-to-b from-white to-gray-50">
  <div className="mb-16">
    <h2 className="text-4xl font-semibold text-center">
      Powerful Features for Perfect Prompts
    </h2>
    <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
      We work on creative sanctuary, dive into the photography world with professional tools.
    </p>
    <div className="flex items-center justify-center mt-2">
      <span className="h-2 w-2 bg-primary rounded-full"></span>
      <span className="h-px w-16 bg-orange-300 ml-2"></span>
      <span className="text-xs text-gray-500 ml-3">photography-dreams</span>
    </div>
  </div>
  
  <div className="grid grid-cols-3 gap-8">
    {featureCards.map((card, index) => (
      <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md p-6 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium">{card.title}</h3>
          <div className="flex items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="#FB8654" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="#FB8654" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {card.description}
        </p>
        <div className="mt-auto">
          <div className="flex space-x-2">
            <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full w-full bg-primary flex items-center justify-center text-white text-xs">
                <i className={card.icon}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* How It Works Section */}
<section className="px-12 py-16 bg-white border-t border-gray-100">
  <div className="flex justify-between items-center mb-16">
    <h2 className="text-4xl font-semibold">How It Works</h2>
  </div>
  
  <div className="grid grid-cols-4 gap-8 relative">
    {/* Connection line */}
    <div className="absolute top-10 left-0 w-full h-1 bg-gray-200"></div>
    
    {steps.map((step, index) => (
      <div key={index} className="text-center relative z-10">
        <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <span className="text-2xl text-white font-semibold">{step.number}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
        <p className="text-gray-600">{step.description}</p>
      </div>
    ))}
  </div>
</section>

{/* Example Outputs Section */}
<section className="px-12 py-16 bg-gray-50">
  <div className="flex justify-between items-center mb-16">
    <h2 className="text-4xl font-semibold">Example Outputs</h2>
  </div>
  
  <div className="grid grid-cols-3 gap-8">
    {exampleOutputs.map((example, index) => (
      <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="aspect-[4/5] bg-gray-100 relative">
          <img
            src={example.image}
            alt={example.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="font-semibold mb-2">{example.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{example.description}</p>
          <div className="text-primary text-sm font-medium cursor-pointer flex items-center">
            View Prompt 
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Call to Action Section */}
<section className="px-12 py-16 bg-primary text-white">
  <div className="flex items-center justify-between">
    <div className="max-w-xl">
      <h2 className="text-3xl font-bold mb-4">
        Start Creating Professional Prompts Today
      </h2>
      <p className="text-white/90 mb-6">
        Join thousands of creators who are generating stunning AI images with our photography-focused prompt builder.
      </p>
      <Link
        href="/tool"
        className="bg-white text-primary px-8 py-3 rounded-full flex items-center w-fit"
      >
        Try It Now - It's Free
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
    
    <div className="relative w-1/3 h-64">
      <div className="absolute -top-12 -right-8">
        <img src={photos[2].src} alt={photos[2].alt} className="w-64 h-80 object-cover rounded-xl shadow-lg" />
      </div>
    </div>
  </div>
</section> 
    </div>
  );
}