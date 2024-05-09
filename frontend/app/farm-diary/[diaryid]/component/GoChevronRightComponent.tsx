"use client";

import { useState } from "react";
import { GoChevronRight } from "react-icons/go";

export default function GoChevronRightComponent() {
  const [month, setMonth] = useState<number>(10);
  return (
    <button
      type="button"
      disabled={month === 11}
      className="flex h-9 w-12 items-center justify-center rounded-r-md border border-gray-300 pl-1 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
    >
      <GoChevronRight />
    </button>
  );
}
