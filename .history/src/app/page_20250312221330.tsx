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

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="h-screen flex relative z-0">
        {/* Left Content */}
        <div className="w-[540px] flex flex-col justify-center pl-8 lg:pl-16">
          <h1 className="text-5xl lg:text-7xl font-medium mb-6">
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
      <section className="py-24 bg-gray-50 relative z-50 transform transition-transform duration-500 hover:translate-y-[-5px]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features for Perfect Prompts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white shadow-lg">
              <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <i className="far fa-camera text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Camera Selection</h3>
              <p className="text-gray-600">Get tailored camera and lens recommendations based on your chosen style and shot type.</p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg">
              <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <i className="far fa-lightbulb-on text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lighting Mastery</h3>
              <p className="text-gray-600">Choose from various lighting setups to enhance your images with the perfect atmosphere.</p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg">
              <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <i className="far fa-compass text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dynamic Angles</h3>
              <p className="text-gray-600">Explore different perspectives with our comprehensive camera angle suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white relative z-50 transform transition-transform duration-500 hover:translate-y-[-5px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Your Subject</h3>
              <p className="text-gray-600">Select from various categories or enter your own subject.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pick Your Style</h3>
              <p className="text-gray-600">Choose from portrait, product, landscape, and more.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customize Settings</h3>
              <p className="text-gray-600">Fine-tune angles, lighting, and technical parameters.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Generate & Create</h3>
              <p className="text-gray-600">Get your optimized prompt and start creating.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Outputs Section */}
      <section className="py-24 bg-gray-50 relative z-50 transform transition-transform duration-500 hover:translate-y-[-5px]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Example Outputs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Portrait Example */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="aspect-[4/5] bg-gray-100 relative">
                <img
                  src="/close-up-male.webp"
                  alt="Portrait photography example"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">Portrait Photography</h3>
                <p className="text-sm text-gray-600 mb-4">Close-up portrait of a man, Canon EF 85mm f/1.4L, natural lighting, eye-level angle</p>
                <div className="text-primary text-sm font-medium">View Prompt →</div>
              </div>
            </div>

            {/* Product Example */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="aspect-[4/5] bg-gray-100 relative">
                <img
                  src="/face-cream.webp"
                  alt="Product photography example"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">Product Photography</h3>
                <p className="text-sm text-gray-600 mb-4">Cosmetic product shot, Sony A7R IV with 90mm Macro, studio lighting setup</p>
                <div className="text-primary text-sm font-medium">View Prompt →</div>
              </div>
            </div>

            {/* Landscape Example */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="aspect-[4/5] bg-gray-100 relative">
                <img
                  src="/Grain_field_Hight_Angle.webp"
                  alt="Landscape photography example"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">Landscape Photography</h3>
                <p className="text-sm text-gray-600 mb-4">Aerial view of grain field, Nikon D850 with 14-24mm f/2.8, golden hour lighting</p>
                <div className="text-primary text-sm font-medium">View Prompt →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-primary relative z-50 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px]">
        <div className="absolute inset-0 bg-primary/90"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Creating Professional Prompts Today
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of creators who are generating stunning AI images with our photography-focused prompt builder.
          </p>
          <Link
            href="/tool"
            className="bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl inline-block animate-[pulse_3s_ease-in-out_infinite]"
          >
            Try It Now - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
}