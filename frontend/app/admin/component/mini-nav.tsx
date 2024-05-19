import Link from "next/link";

interface LinkItem {
  href: string;
  text: string;
}

const links: LinkItem[] = [
  { href: "/admin/role-list", text: "단체/기관 승인" },
  // { href: "/admin/user-list", text: "회원목록" },
];

export default function MiniNavigation({ status }: { status: string }) {
  const getLastWord = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray[hrefArray.length - 1];
  };

  return (
    <div className="flex flex-col items-center gap-[30px] p-[30px] justify-center bg-white relative !border-graygray-300 !rounded-[10px] !border !border-solid !px-[50px] !py-[30px] !w-[220px]">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <div
            className={`font-t-h3 w-fit mt-[-1.00px] tracking-[var(--t-h3-letter-spacing)] text-[length:var(--t-h3-font-size)] [font-style:var(--t-h3-font-style)] relative whitespace-nowrap leading-[var(--t-h3-line-height)] ${
              getLastWord(link.href) === status
                ? "bg-amber-100 rounded-full py-2 px-4"
                : ""
            }`}
          >
            {link.text}
          </div>
        </Link>
      ))}
    </div>
  );
}
