import { useState } from "react";
import { MEMBER_URL } from "@/utils/ServerApi";
import Input from "@/app/_components/common/Input";
import DaumPost from "@/app/_components/common/address";
import ImageComponent from "@/app/_components/common/Image";
import { useUserStore } from "@/app/_stores/userStore";

interface Props {
  areaAddress: string;
  townAddress: string;
}

export default function ChangeRole() {
  const { userInfo } = useUserStore();
  const [selectImage, setSelectImage] = useState<any>();
  const [name, setName] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [addressObj, setAddressObj] = useState<Props>({
    areaAddress: "",
    townAddress: "",
  });

  // 기관등록 신청 로직
  const postAgency = async () => {
    const formData = new FormData();
    formData.append("image", selectImage);
    const response = await fetch(`${MEMBER_URL}/v1/agency/registration`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      body: formData,
    });
    if (response) {
      const responseData = await response.json();
    }
  };

  // 주소 한줄로 합치는 핸들러
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <Input
        labelcss={"text-lg font-semibold"}
        inputcss={
          "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
        }
        placeholder={"기관 또는 단체의 공식 명칭을 입력하세요."}
        type={"string"}
        value={name}
        topcss={"mt-10"}
        labeltext={"시설명"}
        onChange={(value) => setName(value)}
      />
      <div className="text-lg font-semibold mt-10">소재지</div>
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
          type="string"
          value={detailedAddress}
          onChange={(e) => setDetailedAddress(e.target.value)}
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
        value={report}
        topcss={"mt-10"}
        labeltext={"복지시설신고번호"}
        onChange={(e) => setReport(e)}
      />
      <Input
        labelcss={"text-lg font-semibold"}
        inputcss={
          "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
        }
        placeholder={"연락 가능한 전화번호를 입력하세요."}
        type={"string"}
        value={contact}
        topcss={"mt-10"}
        labeltext={"전화번호"}
        onChange={(e) => setContact(e)}
      />
      <div className="text-lg font-semibold mt-10">시설 신고증 사진</div>
      <ImageComponent
        title={"복지시설 신고를 위한 공식 증명을 첨부해주세요"}
        titlecss={""}
        topcss={""}
        topsecondcss={""}
        displayImage={selectImage}
        setDisplayImage={setSelectImage}
      />
      <div className="text-gray-400 text-[13px] font-m-6 leading-[18px] mt-[10px]">
        복지시설 확인을 위한 용도로 별도 저장되지 않습니다
      </div>
    </>
  );
}
