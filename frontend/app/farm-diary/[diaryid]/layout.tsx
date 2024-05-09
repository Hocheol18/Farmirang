"use client";

import { useState } from "react";
import CalendarDate from "./[date]/page";
import Calendar from "./component/calendar";
import Sidebar from "./component/sidebar";
import useSWR from "swr";
import { BASE_URL } from "@/utils/ServerApi";
import Spinner from "@/app/_components/common/Spinner";

const fetcher = (url: string) => fetch(url).then((res: Response) => res.json());

function MainFunction() {
  const { data } = useSWR(`${BASE_URL}/api/v1/field/1`, fetcher, {
    onErrorRetry: (error) => {
      if (error.status === 401) return; // 401 에러일 때 예외처리
    },
    revalidateOnFocus: false, // 탭을 전환할 때 자동 데이터 갱신 방지
    revalidateOnMount: true, // 마운트 될 때만 자동 데이터 갱신
  });

  if (!data) return <Spinner />; // 로딩중

  return <Display />; // 디스플레이
}

function Display() {
  const [current, setCurrent] = useState<boolean>(true);
  return (
    <>
      <div className="flex">
        <div className="relative flex h-[calc(100vh-6rem)] w-[17%] flex-col rounded-xl bg-white bg-clip-border p-4 border-r border-gray-300">
          <Sidebar current={current} setCurrent={setCurrent} />
        </div>
        <div className="w-[83%]">
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
  return <MainFunction />;
}
