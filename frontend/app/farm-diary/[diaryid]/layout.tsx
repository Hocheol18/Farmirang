import Calendar from "./component/calendar";
import Sidebar from "./component/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="relative flex h-[calc(100vh-6rem)] w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 border-r border-gray-300">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Calendar />
      </div>
    </div>
  );
}
