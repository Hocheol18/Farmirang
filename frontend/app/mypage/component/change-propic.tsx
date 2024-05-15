import ImageComponent from "@/app/_components/common/Image";
import React from "react";

interface ChangePictureProps {
  selectImage: any;
  setSelectImage: React.Dispatch<any>;
}

export default function ChangePicture({
  selectImage,
  setSelectImage,
}: ChangePictureProps) {
  return (
    <>
      <ImageComponent
        title={"변경할 사진"}
        titlecss={""}
        topcss={""}
        heightcss={""}
        topsecondcss={""}
        displayImage={selectImage}
        setDisplayImage={setSelectImage}
        handleEvent={() => {}}
      />
    </>
  );
}
