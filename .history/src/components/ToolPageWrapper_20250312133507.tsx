'use client';

export default function ToolPageWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed transition-[background-image] duration-500">
      {children}
    </div>
  );
}