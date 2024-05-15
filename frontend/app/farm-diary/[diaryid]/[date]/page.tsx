import CalendarDate from "./component/CalendarDate";
import CalendarDateSidebar from "./component/CalendarDateSidebar";

export default function Page() {

  return (
    <div className="flex h-full">
    <div className="relative flex h-[calc(100vh-6rem)] w-[17%] flex-col rounded-xl bg-white bg-clip-border p-4 border-r border-gray-300">
      <CalendarDateSidebar/>
    </div>
    <div className="w-[83%] h-full">
      <CalendarDate />
    </div>
  </div>
  );
}
