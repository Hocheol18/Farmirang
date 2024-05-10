"use client";

import { useState } from "react";
import CalendarDate from "./[date]/page";
import Calendar from "./component/calendar";
import Sidebar from "./component/sidebar";

function Display() {
  const [current, setCurrent] = useState<boolean>(true);
  return (
    <>
      <div className="flex h-full">
        <div className="relative flex h-[calc(100vh-6rem)] w-[17%] flex-col rounded-xl bg-white bg-clip-border p-4 border-r border-gray-300">
          <Sidebar current={current} setCurrent={setCurrent} />
        </div>
        <div className="w-[83%] h-full">
          {current ? <Calendar /> : <CalendarDate />}
        </div>
      </div>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Display />
    </>
  );
}
