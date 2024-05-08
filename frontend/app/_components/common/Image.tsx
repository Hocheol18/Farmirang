'use client'

import { PhotoIcon } from "@heroicons/react/20/solid";
import FileUploadButton from "./FileUploadButton";

interface Props {
  // 타이틀 텍스트
  title: String;
  // 타이틀 css
  titlecss: string;
  // 전체 div의 css
  topcss: string;
  // 이미지 가로 길이 조정
  topsecondcss : string;
}

export default function ImageComponent({ title, titlecss, topcss, topsecondcss }: Props) {
  return (
    <>
      <div className={`flex ${topcss}`}>
        <div className={`justify-center ${topsecondcss} `}>
          <label className={`block ${titlecss}`}>{title}</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-500 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-400"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-green-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>5MB이내</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1 text-gray-500">PNG, JPG, GIF 파일</p>
              </div>

              {/* 나중에 useState를 통해서 데이터 입력 */}
              <FileUploadButton handleImage={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
