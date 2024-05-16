import CalendarSideBar from "./component/CalendarSidebar";
import Calendar from "./component/calendar";

export default function DiaryPage() {
  return (
    <>
      <div className="flex h-full">
        <div className="relative flex h-[calc(100vh-6rem)] w-[17%] flex-col rounded-xl bg-white bg-clip-border p-4 border-r border-gray-300">
          <CalendarSideBar />
        </div>
        <div className="w-[83%] h-full">
          <Calendar />
        </div>
      </div>
    </>
  );
}
