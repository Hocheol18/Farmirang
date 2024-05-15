"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "./Button";

interface Props {
  // 버튼 텍스트
  buttonText: string;
  // 버튼 배경 스타일
  buttonBgStyles: string;
  // 버튼 텍스트 스타일
  buttonTextStyles: string;
  // 타이틀 텍스트
  Title: string;
  // 서브 타이틀 텍스트
  subTitle: string;
  // 내용 (컴포넌트로 넘겨도 됨)
  contents: any;
  // 서브타이틀 css
  subTitlecss: string;
  // 타이틀 css
  Titlecss: string;
  // 모달 크기 css
  Modalcss: string;
  // 타이틀 추가 디자인
  Titlebottom: any;
  // 확인 혹은 다음 버튼 텍스트
  next: string;
  // 확인 버튼 클릭시 함수 실행
  onSuccess?: () => void;
  // 모달 staet 변수
  data?: any;
  // 모달 setState 변수
  setData?: React.Dispatch<any>;
  handleFunction?: () => void;
  noButton?: boolean;
}

export default function MypageModal({
  buttonText,
  buttonBgStyles,
  buttonTextStyles,
  Title,
  subTitle,
  contents,
  subTitlecss,
  Titlecss,
  Modalcss,
  Titlebottom,
  next,
  onSuccess,
  handleFunction,
  noButton,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const successHandler = () => {
    onSuccess?.();
    setIsOpen(false);
  };
  return (
    <>
      <Button
        text={buttonText}
        bgStyles={buttonBgStyles}
        textStyles={buttonTextStyles}
        handleClick={() => setIsOpen(true)}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-80 z-0 w-full h-full"></div>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`transform border border-gray-300 overflow-hidden rounded-2xl bg-white-100 p-6 text-left align-middle shadow-xl transition-all ${Modalcss}`}
                >
                  <>
                    <Dialog.Title
                      as="h3"
                      className={`text-black-100 ${Titlecss}`}
                    >
                      {Title}
                      {Titlebottom}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className={`text-black-100 ${subTitlecss}`}>
                        {subTitle}
                      </p>
                    </div>
                    <div className="mt-6">{contents}</div>

                    <div className="flex justify-end mt-10">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border shadow-lg border-transparent bg-green-100 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 mr-4"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="text-green-400 font-bold">취소</div>
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md shadow-xl border border-transparent bg-green-400 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        onClick={() => successHandler()}
                      >
                        <div className="text-white-100 font-bold">{next}</div>
                      </button>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
