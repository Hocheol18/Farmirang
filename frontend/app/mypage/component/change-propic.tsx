import Input from "@/app/_components/common/Input";

export default function ChangePicture() {
  return (
    <>
      <Input
        labelcss={"text-lg font-semibold"}
        inputcss={
          "flex rounded-lg border border-green-300 w-full focus:outline-none focus:ring-green-400 focus:ring-1 h-10 p-2"
        }
        placeholder={""}
        type={"string"}
        value={undefined}
        topcss={"mt-10"}
        labeltext={"변경할 사진"}
        onChange={() => {}}
      />
      <div className="text-gray-400 text-[13px] font-m-6 leading-[18px]">
        jpg, jpeg, png 형식만 첨부해주세요
      </div>
    </>
  );
}
