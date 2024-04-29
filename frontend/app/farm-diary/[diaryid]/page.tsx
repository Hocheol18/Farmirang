import React from "react";
import Calendar from "./calendar";
import Sidebar from "./sidebar";

export default function Diary() {
  return (
    <div className="flex h-screen">
      <div className="relative flex h-[calc(100vh-6rem)] w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 border-r border-gray-300">
        <Sidebar />
      </div>
      <div className="flex-1 mb-24">
        <Calendar />
      </div>
    </div>
  );
}
