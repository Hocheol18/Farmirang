"use client";

import Button from "@/app/_components/common/Button";
import ImageComponent from "@/app/_components/common/Image";
import Input from "@/app/_components/common/Input";
import KakaoMap from "@/app/_components/common/Maps";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function FirstModal() {
  const [state, setState] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setDefault = () => {
    setIsOpen(false);
    setState(true);
  };
  const [goods, setGoods] = useState<string>("");
  const [goodscount, setGoodsCount] = useState<number>();

  return (
    <>
      <Button
        text={"기부하기"}
        bgStyles={"bg-green-400 w-full"}
        textStyles={"font-bold text-white-100 text-l"}
        handleClick={() => setIsOpen(true)}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
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
                  className={`w-full transform border border-gray-400 overflow-hidden rounded-2xl bg-white-100 p-6 text-left align-middle shadow-xl transition-all ${"max-w-[700px] p-[2.5rem]"}`}
                >
                  <>
                    {state ? (
                      <>
                        <Dialog.Title
                          as="h3"
                          className={`text-black-100 ${"font-bold text-h1 relative"}`}
                        >
                          {"후원해요"}
                          <div className="bg-green-200 w-[11rem] h-6 rounded-xl absolute top-8 left-0 z-[-1] opacity-70"></div>
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className={`text-black-100 ${"text-h6"}`}>
                            {"가능한 기부 품목"}
                          </p>
                        </div>
                        <div className="mt-6">
                          <div className="flex justify-center">
                            <div className="flex flex-wrap content-start">
                              <div className="mx-[1.8rem] my-[1.2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>

                              <div className="mx-[1.8rem] my-[1.2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>

                              <div className="mx-[1.8rem] my-[1.2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>

                              <div className="mx-[1.8rem] my-[1.2rem] border border-green-400 rounded-[10rem] w-[96px] h-[96px] shrink-0"></div>
                            </div>
                          </div>

                          <div className="text-h4 mt-[2rem] mb-[1rem] font-bold">
                            여기로 보내면 되요!
                          </div>
                          <KakaoMap />

                          <div className="mt-4 text-h6">
                            멀티캠퍼스 역삼 (서울 강남구 테헤란로 212)
                          </div>
                        </div>

                        <div className="flex justify-end mt-10">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border shadow-lg border-transparent bg-green-100 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 mr-4"
                            onClick={() => {
                              setDefault();
                            }}
                          >
                            <div className="text-green-400 font-bold">취소</div>
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md shadow-xl border border-transparent bg-green-400 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              setState(false);
                            }}
                          >
                            <div className="text-white-100 font-bold">
                              {"다음"}
                            </div>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Dialog.Title
                          as="h3"
                          className={`text-black-100 ${"font-bold text-h3 relative"}`}
                        >
                          {"이미 작물을 보냈어요!"}
                          <div className="bg-green-200 w-[20rem] h-5 rounded-xl absolute top-8 left-0 z-[-1] opacity-70"></div>
                        </Dialog.Title>

                        <div className="flex mt-[2rem] w-full">
                          <Input
                            labeltext={"기부 물품"}
                            topcss="mt-8 w-1/2 pr-[1rem]"
                            labelcss={
                              "block text-h5 leading-12 text-black-100 font-bold"
                            }
                            inputcss={
                              "h-[2.8rem] flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 p-2"
                            }
                            placeholder={"기부 품목을 적어주세요"}
                            type={"text"}
                            value={goods}
                            onChange={setGoods}
                          />{" "}
                          <Input
                            labeltext={"갯수"}
                            topcss="mt-8 w-1/2 pl-[1rem]"
                            labelcss={
                              "block text-h5 leading-12 text-black-100 font-bold"
                            }
                            inputcss={
                              "h-[2.8rem] flex rounded-lg border w-full border-green-300 focus:outline-none focus:ring-green-400 focus:ring-1 p-2"
                            }
                            placeholder={"물품 갯수를 적어주세요"}
                            type={"text"}
                            value={goodscount}
                            onChange={setGoodsCount}
                          />
                        </div>
                        <ImageComponent
                          title={"기부 물품 사진"}
                          titlecss={"font-semibold text-h6"}
                          topcss={"mt-[4rem] justify-center"}
                          topsecondcss="w-5/6"
                        />

                        <div className="flex justify-end mt-10">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border shadow-lg border-transparent bg-green-100 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 mr-4"
                            onClick={() => {
                              setState(true);
                            }}
                          >
                            <div className="text-green-400 font-bold">뒤로</div>
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md shadow-xl border border-transparent bg-green-400 px-4 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              setState(false);
                            }}
                          >
                            <div className="text-white-100 font-bold">
                              {"확인"}
                            </div>
                          </button>
                        </div>
                      </>
                    )}
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
