export default function FarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full">
      <div className="mx-auto my-7 w-full">{children}</div>
    </div>
  );
}
