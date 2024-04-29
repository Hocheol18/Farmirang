import Image from "next/image";
import "./style.css";

export default function Login() {
  return (
    <div>
      <div className="screen">
        <div className="group">
          <div className="rectangle-4" />
        </div>

        <div className="frame-4">
          <div className="text-wrapper-6">로그인 · 회원가입</div>
          <p className="p">
            파종부터 수확까지
            <br />
            나만의 주말농장 조력자, 팜이랑
          </p>
          <div className="frame-5">
            <Image
              src="/user/loginWithKaKao.png"
              alt="kakao Logo"
              className="KAKAO-LOGIN"
              width={302}
              height={45}
            />{" "}
            <Image
              src="/user/loginWithGoogle2.png"
              alt="Google Logo"
              className="img"
              width={302}
              height={45}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
