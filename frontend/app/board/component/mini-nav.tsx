import Link from "next/link";

interface LinkItem {
  href: string;
  text: string;
}

const links: LinkItem[] = [
  { href: "/board/neighbor", text: "이웃소통" },
  { href: "/board/farm-designs", text: "텃밭구경" },
  { href: "/board/barter", text: "작물교환" },
  { href: "/board/realty", text: "텃밭중개" },
];

export default function MiniNavigation({ status }: { status: string }) {
  const getLastWord = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray[hrefArray.length - 1];
  };

  return (
    <div className="flex items-center gap-[30px] p-[30px] justify-center bg-white !border-graygray-300 !rounded-[10px] !border !border-solid !px-[50px] !py-[30px] w-full">
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
