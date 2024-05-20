"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Popover } from "@headlessui/react";
import {
  IoChatboxEllipsesOutline,
  IoChatboxEllipses,
  IoArrowBack,
} from "react-icons/io5";
import { SiAdblock } from "react-icons/si";
import { Avatar } from "./_components/common/Avatar";
import { Badge } from "./_components/common/Badge";
import Button from "./_components/common/Button";

export default function ChatButton() {
  const selectList = useState<string[]>(["chatList", "chatting", "blockList"]);
  const [currentSelect, setCurrentSelect] = useState<string>("chatList");

  return (
    <>
      {/* 팝업 뜨기 전 기본 버튼 */}
      <Popover className="fixed bottom-4 right-4">
        <Popover.Button>
          <div className="fixed bottom-4 right-4">
            <div className="relative w-[90px] h-[90px] bg-green-300 rounded-[89.5px]" />
            <div className="inline-flex flex-col items-center absolute top-[9px] left-[14px]">
              <div className="relative w-fit font-t-h5 font-[number:var(--t-h2-font-weight)] text-white-100 text-[length:var(--t-h5-font-size)] text-center tracking-[var(--t-h5-letter-spacing)] leading-[var(--t-h5-line-height)] whitespace-nowrap [font-style:var(--t-h2-font-style)]">
                채팅하기
              </div>
              <Image
                className="relative w-[63px] h-[45px] object-cover"
                width={63}
                height={45}
                alt="Chat"
                src="/user/chatmodal.png"
              />
            </div>
          </div>
        </Popover.Button>

        {/* 팝업 뜬 후 */}
        <Popover.Panel
          as="div"
          className="w-[350px] h-[600px] bg-white-100 border absolute z-10 flex items-start gap-[10px] shadow-[0px_8px_20px_#3881404c] px-[15px] py-[15px] overflow-hidden rounded-[15px] fixed bottom-20 right-4"
        >
          {currentSelect === "chatting" ? (
            <Chatting setCurrentSelect={setCurrentSelect} />
          ) : (
            <>
              {/* 상단 창 */}
              <div className="w-full flex flex-col items-center justify-center gap-[15px] relative flex-1 grow mb-[-3.00px]">
                <div className="h-[501px] overflow-auto flex flex-col items-center gap-[5px] relative self-stretch w-full">
                  {currentSelect === "chatList" ? (
                    <ChatList setCurrentSelect={setCurrentSelect} />
                  ) : (
                    <BlockList />
                  )}
                </div>

                {/* 하단 메뉴 */}
                <div className="flex items-center justify-center space-around  relative self-stretch w-full flex-[0_0_auto]">
                  <div
                    className="cursor-pointer w-[50%] inline-flex flex-col items-center justify-center relative flex-[0_0_auto]"
                    onClick={() => setCurrentSelect("chatList")}
                  >
                    {currentSelect === "chatList" ? (
                      <>
                        <IoChatboxEllipses size="30" color="#6DBB76" />
                        <div className="w-fit text-green-300 relative font-m-h5 font-[number:var(--m-h5-font-weight)] text-[length:var(--m-h5-font-size)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
                          대화 목록
                        </div>
                      </>
                    ) : (
                      <>
                        <IoChatboxEllipsesOutline size="30" />
                        <div className="w-fit text-greengreen-300 relative font-m-h5 font-[number:var(--m-h5-font-weight)] text-[length:var(--m-h5-font-size)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
                          대화 목록
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    className="cursor-pointer w-[50%] inline-flex flex-col items-center justify-center relative flex-[0_0_auto]"
                    onClick={() => setCurrentSelect("blockList")}
                  >
                    {currentSelect === "blockList" ? (
                      <>
                        <SiAdblock size="30" color="#6DBB76" />
                        <div className="w-fit text-green-300 relative font-m-h5 font-[number:var(--m-h5-font-weight)] text-[length:var(--m-h5-font-size)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
                          차단 목록
                        </div>
                      </>
                    ) : (
                      <>
                        <SiAdblock size="30" />
                        <div className="w-fit text-black relative font-m-h5 font-[number:var(--m-h5-font-weight)] text-[length:var(--m-h5-font-size)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] whitespace-nowrap [font-style:var(--m-h5-font-style)]">
                          차단 목록
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </Popover.Panel>
      </Popover>
    </>
  );
}

function ChatList({
  setCurrentSelect,
}: {
  setCurrentSelect: (newValue: string) => void;
}) {
  const handleClick = () => {
    setCurrentSelect("chatting"); // setCurrentSelect 함수를 호출하여 currentSelect 값을 변경합니다.
  };

  return (
    <>
      <div
        className="w-full p-3 flex items-center p-1 bg-white border-b-4 border-gray-100 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3 ">
          <Avatar
            badge={false}
            className="h-10 w-10"
            image="/user/user.png"
            name1
            nameClassName="h-20 w-20"
            size="sm"
            src=""
            src1
            srcClassName="h-20 w-20"
          />
          <div className="flex flex-col items-start gap-[5px]">
            <div className="text-black mt-[-1.00px] font-medium font-m-h5 leading-5">
              박호철
            </div>
            <div className="text-gray-400 font-m-h5 leading-5">
              지금 교환돼욤?
            </div>
          </div>
        </div>
        <Badge
          className="ml-auto p-5" // Adjust the spacing as needed
          colorScheme="red"
          contentClassName="font-m-h5 leading-5"
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
      <div className="w-full justify-between p-3 flex items-center p-1 bg-white border-b-4 border-gray-100">
        <div className="flex items-center  space-x-3">
          <Avatar
            badge={false}
            className="h-10 w-10"
            image="/user/user.png"
            name1
            nameClassName="h-20 w-20"
            size="sm"
            src=""
            src1
            srcClassName="h-20 w-20"
          />
          <div className="flex flex-col items-start gap-[5px]">
            <div className="text-black mt-[-1.00px] font-medium font-m-h4 leading-5">
              박호철
            </div>
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

function Chatting({
  setCurrentSelect,
}: {
  setCurrentSelect: (newValue: string) => void;
}) {
  const handleClick = () => {
    setCurrentSelect("chatList");
  };

  const [inputText, setInputText] = useState("");
  const [keyCounter, setKeyCounter] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const [chatList, setChatList] = useState<JSX.Element[]>([]);

  const textHandler = () => {
    if (!inputText.trim()) {
      alert("내용을 입력해주세용");
      return;
    }
    const newChatItem = <MyChatContent key={keyCounter} content={inputText} />;
    const newChatList = [...chatList, newChatItem];
    setInputText("");
    setChatList(newChatList);
    setKeyCounter((prevCounter) => prevCounter + 1);
  };

  const enterHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      if (e.nativeEvent.isComposing) {
        return;
      }
      textHandler();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <div className="items-center w-full h-[570px] overflow-auto gap-[15px] flex-1 grow flex flex-col relative">
      {/* 상단바 */}
      <div
        className="flex justify-between space-x-3 cursor-pointer w-full"
        onClick={handleClick}
      >
        <IoArrowBack />
        <span className="m-0">사용자명</span>
        <div></div>
      </div>
      {/* 채팅창 */}
      <div
        className="items-center w-full h-[450px] overflow-auto gap-[15px] flex-1 grow flex flex-col relative"
        ref={chatRef}
      >
        <div className="flex flex-col items-start gap-[5px] relative self-stretch w-full">
          <div className="inline-flex items-start justify-center gap-[15px] relative flex-[0_0_auto]">
            <Avatar
              badge={false}
              className="h-10 w-10"
              image="/user/user.png"
              name1
              nameClassName="h-20 w-20"
              size="sm"
              src=""
              src1
              srcClassName="h-20 w-20"
            />
            <div className="inline-flex items-center justify-center gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-gray-200 rounded-[20px] overflow-hidden">
              <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
                바쁘세효?바쁘세효?바쁘세효?바쁘세효?바쁘세효?바쁘세효?바쁘세효?바쁘세효?바쁘세효?바쁘세효?바쁘세효?
              </div>
            </div>
          </div>
        </div>
        <div className="items-end gap-[5px] self-stretch w-full flex flex-col relative">
          <div className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden">
            <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
              뚱인데염?ㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㄴㅇㄹㄴㅇㄴㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇ
            </div>
          </div>
        </div>
        <div className="items-end gap-[5px] self-stretch w-full flex flex-col relative">
          <div className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden">
            <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
              뚱인데염?ㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㄴㅇㄹㄴㅇㄴㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇ
            </div>
          </div>
        </div>
        <div className="items-end gap-[5px] self-stretch w-full flex flex-col relative">
          <div className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden">
            <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
              뚱인데염?ㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㄴㅇㄹㄴㅇㄴㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇ
            </div>
          </div>
        </div>
        <div className="items-end gap-[5px] self-stretch w-full flex flex-col relative">
          <div className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden">
            <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
              뚱인데염?ㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㄴㅇㄹㄴㅇㄴㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇ
            </div>
          </div>
        </div>
        <div className="items-end gap-[5px] self-stretch w-full flex flex-col relative">
          <div className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden">
            <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
              뚱인데염?ㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㄴㅇㄹㄴㅇㄴㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇ
            </div>
          </div>
        </div>
        <div className="items-end gap-[5px] self-stretch w-full flex flex-col relative">
          <div className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden">
            <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
              뚱인데염?ㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㄴㅇㄹㄴㅇㄴㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇ
            </div>
          </div>
        </div>
        <div className="items-end gap-[5px] self-stretch w-full flex flex-col relative">
          <div className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden">
            <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
              뚱인데염?ㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㄴㅇㄹㄴㅇㄴㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇ
            </div>
          </div>
        </div>
        <div className="items-end gap-[5px] self-stretch w-full flex flex-col relative">
          <div className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden">
            <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
              뚱인데염?ㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㄴㅇㄹㄴㅇㄴㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇ
            </div>
          </div>
        </div>
        {/* 시도중 */}
        {/* <div
          className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden"
          ref={chatRef}
        >
          <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)]">
            {chatList.length > 0 ? chatList : <p>　</p>}
          </div>
        </div> */}
        {/* 시도중 */}
        {chatList.length > 0 ? chatList : null}
      </div>
      {/* 입력창 */}
      <div className="w-full relative border-solid border-2 border-green-300 rounded-[5px]">
        <textarea
          value={inputText}
          rows={1}
          className="w-full h-[55px] rounded-md px-2 py-2 resize-none outline-none bg-white bg-opacity-80"
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={enterHandler}
        />
        <div
          className="absolute top-1/2 transform -translate-y-1/2 right-1 cursor-pointer text-gray-400"
          onClick={textHandler}
        >
          전송
        </div>
      </div>
    </div>
  );
}

function MyChatContent({ content }: { content: string }) {
  return (
    <div className="items-end gap-[5px] self-stretch w-full flex flex-col relative">
      <div className="inline-flex items-center justify-end gap-[10px] px-[18px] py-[12px] relative flex-[0_0_auto] bg-green-200 rounded-[20px] overflow-hidden">
        <div className="relative self-stretch w-[200px] mt-[-1.00px] font-m-h5 font-[number:var(--m-h5-font-weight)] tracking-[var(--m-h5-letter-spacing)] leading-[var(--m-h5-line-height)] [font-style:var(--m-h5-font-style)] break-all">
          {content}
        </div>
      </div>
    </div>
  );
}
