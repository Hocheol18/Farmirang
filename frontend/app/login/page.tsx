import Image from "next/image";
import LoginButton from "./loginbutton";
import "./style.css";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-[10px] relative">
      <div className="relative self-stretch overflow-hidden w-full h-full bg-[url(/user/farm.jpg)] bg-cover bg-[50%_50%]">
        <div className="background-box" />
      </div>
      <div className="flex flex-col w-[23.75rem] items-center justify-center gap-[25px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="self-stretch mt-[-1.00px] text-yellow-200 text-[length:var(--t-h1-font-size)] text-center tracking-[var(--t-h1-letter-spacing)] leading-[var(--t-h1-line-height)] relative font-t-h1 font-[number:var(--t-h1-font-weight)] [font-style:var(--t-h1-font-style)]">
          로그인 · 회원가입
        </div>
        <p className="self-stretch text-gray-200 text-[length:var(--t-h3-font-size)] text-center tracking-[var(--t-h3-letter-spacing)] leading-[var(--t-h3-line-height)] relative font-t-h3 font-[number:var(--t-h3-font-weight)] [font-style:var(--t-h3-font-style)]">
          파종부터 수확까지
          <br />
          나만의 주말농장 조력자, 팜이랑
        </p>
        <div className="inline-flex flex-col h-[101px] items-center justify-center gap-[12px] relative">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
