"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface Props {
  handleImage: (file: File) => void;
}

export default function FileUploadButton({ handleImage }: Props) {
  const [fileName, setFileName] = useState<string>("");
  const inputEl = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const nameWithoutExtension =
          file.name.slice(0, file.name.lastIndexOf(".")) || file.name;
        setFileName(nameWithoutExtension);
        
        handleImage(file);
      }
    }
  };

  // useEffect(() => {
  //   console.log(fileName);
  // }, [fileName]);

  const triggerFileInput = () => {
    inputEl.current?.click();
  };

  return (
    <>
      <div className="flex">
        {fileName ? (
          <Button
            text={fileName}
            bgStyles={
              "py-[1.5rem] px-[1.5rem] cursor-pointer mt-4 border border-gray-300"
            }
            textStyles={"font-bold text-l"}
            handleClick={triggerFileInput}
          ></Button>
        ) : (
          <Button
            text={"이미지 선택하기"}
            bgStyles={
              "py-[1.5rem] px-[1.5rem] cursor-pointer mt-4 border border-gray-300"
            }
            textStyles={"font-bold text-l"}
            handleClick={triggerFileInput}
          ></Button>
        )}

        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="hidden"
          ref={inputEl}
          accept="image/jpg, image/jpeg, image/png"
        />
      </div>
    </>
  );
}
