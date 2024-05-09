import { useState } from "react";
import Input from "@/app/_components/common/Input";
import DaumPost from "@/app/_components/common/address";

interface Props {
  areaAddress: string;
  townAddress: string;
}

export default function ChangeRole() {
  const [addressObj, setAddressObj] = useState<Props>({
    areaAddress: "",
    townAddress: "",
  });

  return (
    <>
      <Input
        labelcss={"text-lg font-semibold"}
        inputcss={
          "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
        }
        placeholder={"기관 또는 단체의 공식 명칭을 입력하세요."}
        type={"string"}
        value={undefined}
        topcss={"mt-10"}
        labeltext={"시설명"}
        onChange={() => {}}
      />
      <Input
        labelcss={"text-lg font-semibold"}
        inputcss={
          "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
        }
        placeholder={"기관 또는 단체가 위치한 정확한 주소를 입력하세요."}
        type={"string"}
        value={undefined}
        topcss={"mt-10"}
        labeltext={"소재지"}
        onChange={() => {}}
      />
      <DaumPost setAddressObj={setAddressObj} />
      <div className="mt-4">
        <input
          value={addressObj.areaAddress}
          onChange={() => {}}
          className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
          placeholder="주소 찾기를 눌러주세요"
        />
      </div>
      <div className="mt-4">
        <input
          value={addressObj.townAddress}
          onChange={() => {}}
          className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
          placeholder="주소 찾기를 눌러주세요"
        />
      </div>
      <div className="mt-4">
        <input
          type="text"
          onChange={() => {}}
          className="flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
          placeholder="상세 주소를 입력해주세요"
        />
      </div>
      <Input
        labelcss={"text-lg font-semibold"}
        inputcss={
          "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
        }
        placeholder={"복지시설 신고번호를 입력하세요."}
        type={"string"}
        value={undefined}
        topcss={"mt-10"}
        labeltext={"복지시설신고번호"}
        onChange={() => {}}
      />
      <Input
        labelcss={"text-lg font-semibold"}
        inputcss={
          "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
        }
        placeholder={"연락 가능한 전화번호를 입력하세요."}
        type={"string"}
        value={undefined}
        topcss={"mt-10"}
        labeltext={"전화번호"}
        onChange={() => {}}
      />
      <Input
        labelcss={"text-lg font-semibold"}
        inputcss={
          "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
        }
        placeholder={
          "복지시설 신고를 위한 공식 증명을 첨부해주세요. (jpg, jpeg, png 형식만 첨부)"
        }
        type={"string"}
        value={undefined}
        topcss={"mt-10"}
        labeltext={"시설신고증사진"}
        onChange={() => {}}
      />
      <div className="text-gray-400 text-[13px] font-m-6 leading-[18px]">
        복지시설 확인을 위한 용도로 별도 저장되지 않습니다
      </div>
    </>
  );
}
