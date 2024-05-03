"use client";

import Image from "next/image";
import { useState } from "react";
import { Popover } from "@headlessui/react";
import { IoChatboxEllipsesOutline, IoChatboxEllipses } from "react-icons/io5";
import { SiAdblock } from "react-icons/si";
import { Avatar } from "./_components/common/Avatar";
import { Badge } from "./_components/common/Badge";
import Button from "./_components/common/Button";

export default function ChatButton() {
  const [currentSelect, setCurrentSelect] = useState<boolean>(true);

  return (
    <>
      <Popover className="relative">
        <Popover.Button>
          <div className="fixed bottom-4 right-4">
            <div className="relative w-[90px] h-[90px] bg-green-300 rounded-[89.5px]" />
            <div className="inline-flex flex-col items-center absolute top-[9px] ">
              <div className="relative w-fit font-t-h5 font-[number:var(--t-h2-font-weight)] text-white-100 text-[length:var(--t-h5-font-size)] text-center tracking-[var(--t-h5-letter-spacing)] leading-[var(--t-h5-line-height)] whitespace-nowrap [font-style:var(--t-h2-font-style)]">
                채팅하기
              </div>
              <Image
                className="relative w-[63px] h-[45px] object-cover"
                width={63}
                height={45}
                alt="Chat"
                src="/user/chatModal.png"
              />
            </div>
          </div>
        </Popover.Button>

        <Popover.Panel
          as="div"
          className="w-[350px] h-[600px] bg-white-100 border absolute z-10 flex items-start gap-[10px] shadow-[0px_8px_20px_#3881404c] px-[25px] py-[15px] overflow-hidden rounded-[15px] fixed bottom-20 right-4"
        >
          <div className="w-full flex flex-col items-center justify-center gap-[15px] relative flex-1 grow mb-[-3.00px]">
            <div className="flex flex-col items-center gap-[5px] relative self-stretch w-full">
              {currentSelect ? <ChatList /> : <BlockList />}
            </div>

            <div
              className="flex items-center justify-center space-around  relative self-stretch w-full flex-[0_0_auto]"
              onClick={() => setCurrentSelect(true)}
            >
              <div className="cursor-pointer w-[50%] inline-flex flex-col items-center justify-center relative flex-[0_0_auto]">
                <IoChatboxEllipsesOutline size="30" />
                <div className="w-fit text-greengreen-300 relative font-m-h5 font-[number:var(--m-h5-font-weight)] text-[length:var(--m-h5-font-size)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
                  대화 목록
                </div>
              </div>

              <div
                className="cursor-pointer w-[50%] inline-flex flex-col items-center justify-center relative flex-[0_0_auto]"
                onClick={() => setCurrentSelect(false)}
              >
                <SiAdblock size="30" />
                <div className="w-fit text-black relative font-m-h5 font-[number:var(--m-h5-font-weight)] text-[length:var(--m-h5-font-size)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
                  차단 목록
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
}

function ChatList() {
  return (
    <>
      <div className="inline-flex items-center  p-[5px] relative flex-[0_0_auto] bg-[#ffffff] border-b-4 border-gray-100">
        <div className="inline-flex items-center gap-[16px] relative flex-[0_0_auto]">
          <Avatar
            badge={false}
            className="!h-[50px] !w-[50px]"
            image="/user/user.png"
            name1
            nameClassName="!h-[100px] !w-[100px]"
            size="sm"
            src=""
            src1
            srcClassName="!h-[100px] !w-[100px]"
          />
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="relative  h-[36px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] text-black text-[length:var(--m-h5-font-size)] text-center tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
              박호철
            </div>
            <div className=" h-[36px] text-graygray-400 text-center relative font-m-h5 font-[number:var(--m-h5-font-weight)] text-[length:var(--m-h5-font-size)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
              지금 교환돼욤?
            </div>
          </div>
        </div>
        <Badge
          className="!flex-[0_0_auto] !p-[10px]"
          colorScheme="red"
          contentClassName="!tracking-[var(--m-h5-letter-spacing)] !text-[length:var(--m-h5-font-size)] ![font-style:var(--m-h5-font-style)] !font-[number:var(--m-h5-font-weight)] !font-m-h5 !leading-[var(--m-h5-line-height)]"
          variant="solid"
        >
          1
        </Badge>
      </div>

      <div className="inline-flex items-center gap-[197px] p-[15px] relative flex-[0_0_auto] bg-[#ffffff]">
        <div className="inline-flex items-center gap-[16px] relative flex-[0_0_auto]">
          <Avatar
            badge={false}
            className="!h-[100px] !w-[100px]"
            image="/user/user.png"
            name1
            nameClassName="!h-[100px] !w-[100px]"
            size="lg"
            src=""
            src1
            srcClassName="!h-[100px] !w-[100px]"
          />
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="relative  h-[36px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] text-black text-[length:var(--m-h5-font-size)] text-center tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
              박호철
            </div>
            <div className=" h-[36px] text-graygray-400 text-center relative font-m-h5 font-[number:var(--m-h5-font-weight)] text-[length:var(--m-h5-font-size)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
              지금 교환돼욤?
            </div>
          </div>
        </div>
        <Badge
          className="!flex-[0_0_auto] !p-[10px]"
          colorScheme="red"
          contentClassName="!tracking-[var(--m-h5-letter-spacing)] !text-[length:var(--m-h5-font-size)] ![font-style:var(--m-h5-font-style)] !font-[number:var(--m-h5-font-weight)] !font-m-h5 !leading-[var(--m-h5-line-height)]"
          variant="solid"
        >
          1
        </Badge>
      </div>
    </>
  );
}

function BlockList() {
  const handleClick = () => {
    // 클릭 이벤트 발생 시 실행될 로직 작성
    console.log("Button clicked");
  };

  return (
    <>
      <div className="inline-flex items-center justify-center gap-[176px] p-[15px] relative flex-[0_0_auto] bg-[#ffffff] border-b-4 border-gray-100">
        <div className="inline-flex items-center justify-center gap-[16px] relative flex-[0_0_auto]">
          <Avatar
            badge={false}
            className="!h-[100px] !w-[100px]"
            image="/user/user.png"
            name1
            nameClassName="!h-[100px] !w-[100px]"
            size="lg"
            src=""
            src1
            srcClassName="!h-[100px] !w-[100px]"
          />
          <div className="relative w-[120px] h-[36px] font-m-h5 font-[number:var(--m-h5-font-weight)] text-black text-[length:var(--m-h5-font-size)] text-center tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
            박호철
          </div>
        </div>
        <Button
          text="차단 해제"
          bgStyles="bg-green-400"
          textStyles="text-white-100"
          handleClick={handleClick}
        />
      </div>
    </>
  );
}
