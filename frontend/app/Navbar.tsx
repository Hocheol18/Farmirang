"use client";

import { useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://wp-ht-s3.s3.ap-northeast-2.amazonaws.com/farmirang/profile/default.png",
};

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  // router
  const [navigation, setNavigation] = useState([
    { name: "텃밭꾸미기", href: "/farm-design", current: false },
    { name: "텃밭일기", href: "/farm-diary", current: false },
    { name: "이웃이야기", href: "/board", current: false },
    { name: "기부하기", href: "/donation", current: false },
  ]);

  const handleEvent = (href: string, index: number) => {
    const newNavigation = navigation.map((item, idx) => ({
      ...item,
      current: idx === index,
    }));
    setNavigation(newNavigation);

    router.push(href);
  };

  const extraPageEvent = (href : string) => {
    const newNavigation = navigation.map((item) => ({
      ...item,
      current: false,
    }));
    setNavigation(newNavigation);
    router.push(`${href}`);
  };

  return (
    <>
      <div className="top-0 z-10 border-b">
        <Disclosure as="nav">
          {() => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-full items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="flex-shrink-0 text-green-500 font-extrabold text-h4 font-tmoney"
                      onClick={() => {
                        extraPageEvent("/");
                      }}
                    >
                      팜이랑
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-32 flex items-baseline space-x-8">
                        {navigation.map((item, idx) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "text-green-400 border-b-2 border-green-400"
                                : "text-black-100 hover:text-green-500",
                              "px-3 py-6 text-h6 font-extrabold font-tmoney"
                            )}
                            aria-current={item.current ? "page" : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              handleEvent(item.href, idx);
                            }}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-6 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full p-1"
                      >
                        <span className="absolute -inset-1.5" />
                        <BellIcon className="h-8 w-8" aria-hidden="true" />
                      </button>

                      <Menu as="div" className="relative ml-6">
                        <Menu.Button
                          className="relative flex max-w-xs items-center rounded-full"
                          onClick={() => extraPageEvent("/mypage")}
                        >
                          <span className="absolute -inset-1.5" />
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                            width={100}
                            height={100}
                          />
                        </Menu.Button>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
        <header className="bg-white shadow" />
      </div>
    </>
  );
}
