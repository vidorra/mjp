export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cover bg-center bg-fixed transition-[background-image] duration-500">
      {children}
    </div>
  );
}