import VerticalPhotoStack from '../components/VerticalPhotoStack';

export default function Home() {
  const photos = [
    {
      id: 1,
      src: '/bg.webp',
      alt: 'Background landscape'
    },
    {
      id: 2,
      src: '/close-up-male.webp',
      alt: 'Close up portrait'
    }
  ];

  return (
    <main className="min-h-screen">
      <section className="text-center pt-20 pb-8 px-4">
        <h1 className="text-5xl font-bold mb-8">
          A place to create your masterpiece.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Build powerful prompts for your photography projects with our intuitive tools.
        </p>
      </section>
      
      <VerticalPhotoStack photos={photos} containerHeight={1800} />
    </main>
  );
}