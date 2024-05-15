import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import useDaumPostcodePopup from "react-daum-postcode/lib/useDaumPostcodePopup";

interface parentProps {
  areaAddress: string;
  townAddress: string;
}

interface Props {
  setAddressObj: React.Dispatch<React.SetStateAction<parentProps>>;
}

function DaumPost({ setAddressObj }: Props) {
  //클릭 시 수행될 팝업 생성 함수
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = ""; //추가될 주소
    let localAddress = data.sido + " " + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
    if (data.addressType === "R") {
      //주소타입이 도로명주소일 경우
      if (data.bname !== "") {
        extraAddress += data.bname; //법정동, 법정리
      }
      if (data.buildingName !== "") {
        //건물명
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      //지역주소 제외 전체주소 치환
      fullAddress = fullAddress.replace(localAddress, "");
      //조건 판단 완료 후 지역 주소 및 상세주소 state 수정
      setAddressObj({
        areaAddress: localAddress,
        townAddress: (fullAddress +=
          extraAddress !== "" ? `(${extraAddress})` : ""),
      });
      //주소 검색이 완료된 후 결과를 매개변수로 전달
    }
  };
  //클릭 시 발생할 이벤트
  const handleClick = () => {
    //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
    open({ onComplete: handleComplete });
  };
  return (
    <>
      <button
        type="button"
        className="border bg-green-400 w-28 h-10 rounded-lg mt-2"
        onClick={handleClick}
      >
        <div className="text-white-100 font-bold">주소찾기</div>
      </button>
    </>
  );
}

export default DaumPost;
