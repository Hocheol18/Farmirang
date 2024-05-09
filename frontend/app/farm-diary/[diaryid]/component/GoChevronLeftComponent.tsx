"use client";

import { useState } from "react";
import { GoChevronLeft } from "react-icons/go";

export default function GoChevronLeftComponent() {
  const [month, setMonth] = useState<number>(1);

  return (
    <button
      type="button"
      disabled={month === 0}
      onClick={() => setMonth(month - 1)}
      className="flex h-9 w-12 items-center justify-center rounded-l-md border border-gray-300 pr-1 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
    >
      <GoChevronLeft />
    </button>
  );
}
