"use client";

import { useRouter } from "next/navigation";

export default function Diary() {
  const router = useRouter();
  return (
    <>
      <button className="border-4"
        onClick={() => {
          router.push("./farm-diary/1");
        }}
        
      >하위</button>
    </>
  );
}
