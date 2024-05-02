'use client'

import { useState } from "react";
import CalendarDate from "./[date]/page";
import Calendar from "./component/calendar";
import Sidebar from "./component/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [current, setCurrent] = useState<boolean>(true)
  return (
    <div className="flex">
      <div className="relative flex h-[calc(100vh-6rem)] w-[17%] flex-col rounded-xl bg-white bg-clip-border p-4 border-r border-gray-300">
        <Sidebar current={current} setCurrent={setCurrent} />
      </div>
      <div className="w-[83%]">
        {current ? <Calendar /> : <CalendarDate />}
      </div>
    </div>
  );
}
