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
    <div className="bg-white">
      <VerticalPhotoStack photos={photos} containerHeight={1800} />
    </div>
  );
}