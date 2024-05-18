'use client'

import Spinner from "@/app/_components/common/Spinner";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LinkItem {
  href: string;
  text: string;
}

const links: LinkItem[] = [
  { href: "/mypage/profile", text: "내 프로필" },
  { href: "/mypage/farm-designs", text: "내 꾸미기 목록" },
  { href: "/mypage/farms", text: "내 밭 목록" },
  { href: "/mypage/approve", text: "후원승인/반려" },
  { href: "/donation/write", text: "기부신청" },
];

const linksNotAgency: LinkItem[] = [{ href: "/mypage/profile", text: "내 프로필" },
{ href: "/mypage/farm-designs", text: "내 꾸미기 목록" },
{ href: "/mypage/farms", text: "내 밭 목록" },{
  href: "/mypage/donate", text : "기부 신청 현황"
}]

export default function MiniNavigation({ status }: { status: string }) {
  const getLastWord = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray[hrefArray.length - 1];
  };

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ls = window.localStorage.getItem("userInfo");
      if (ls) {
        const lsInfo = JSON.parse(ls);
        setRole(lsInfo.state.userInfo.role);
      } else {
        setRole("")
      }
    }
  }, []);

  if (role === null) {
    return (
      <Spinner></Spinner>
    );
  }


  return (
    <>
      {role === "AGENCY" ? <div className="flex flex-col items-center gap-[30px] p-[30px] justify-center bg-white relative !border-graygray-300 !rounded-[10px] !border !border-solid !px-[50px] !py-[30px] !w-[220px]">
        {links.map((link, index) => (
          <Link key={index} href={link.href}>
            <div
              className={`font-t-h3 w-fit mt-[-1.00px] tracking-[var(--t-h3-letter-spacing)] text-[length:var(--t-h3-font-size)] [font-style:var(--t-h3-font-style)] relative whitespace-nowrap leading-[var(--t-h3-line-height)] ${getLastWord(link.href) === status
                ? "bg-amber-100 rounded-full py-2 px-4"
                : ""
                }`}
            >
              {link.text}
            </div>
          </Link>
        ))}
      </div> : <div className="flex flex-col items-center gap-[30px] p-[30px] justify-center bg-white relative !border-graygray-300 !rounded-[10px] !border !border-solid !px-[50px] !py-[30px] !w-[220px]">
        {linksNotAgency.map((link, index) => (
          <Link key={index} href={link.href}>
            <div
              className={`font-t-h3 w-fit mt-[-1.00px] tracking-[var(--t-h3-letter-spacing)] text-[length:var(--t-h3-font-size)] [font-style:var(--t-h3-font-style)] relative whitespace-nowrap leading-[var(--t-h3-line-height)] ${getLastWord(link.href) === status
                ? "bg-amber-100 rounded-full py-2 px-4"
                : ""
                }`}
            >
              {link.text}
            </div>
          </Link>
        ))}
      </div>}
    </>
  );
}
