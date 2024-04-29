export default function FarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex border-2 h-full">
      <div className="m-auto h-full">{children}</div>
    </div>
  );
}
