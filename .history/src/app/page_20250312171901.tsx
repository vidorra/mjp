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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex">
        {/* Left Content */}
        <div className="w-[540px] flex flex-col justify-center pl-8 lg:pl-16">
          <h1 className="text-5xl lg:text-7xl font-medium mb-6">
            Create Perfect
            <br />
            <span className="text-primary">Photo Prompts</span>
          </h1>
          <p className="text-xl mb-8 text-gray-600 max-w-xl">
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
        <div className="flex-1">
          <VerticalPhotoStack photos={photos} containerHeight={3000} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 lg:px-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Our Tool?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Suggestions</h3>
            <p className="text-gray-600">Get intelligent prompt suggestions based on your photography style and subject.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Results</h3>
            <p className="text-gray-600">Create prompts that generate stunning, professional-quality photographs.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customizable Options</h3>
            <p className="text-gray-600">Fine-tune every aspect of your prompt with our comprehensive settings.</p>
          </div>
        </div>
      </section>
    </div>
  );
}