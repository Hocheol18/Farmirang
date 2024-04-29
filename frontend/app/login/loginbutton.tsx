import Image from "next/image";

export default function LoginButton() {
  return (
    <div className="gap-[12px]">
      <Image
        src="/user/KAKAO_LOGIN.png"
        alt="kakao Logo"
        className="KAKAO-LOGIN"
        width={302}
        height={45}
      />{" "}
      <Image
        src="/user/GOOGLE_LOGIN.png"
        alt="Google Logo"
        className="img"
        width={302}
        height={45}
        priority
      />
    </div>
  );
}
