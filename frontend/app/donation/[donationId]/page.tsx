import Remote from "../component/Remote";

export default function DonationDetailPage() {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center">기부중</div>
      <div className="flex justify-center">동네 주민에게 사랑을</div>
      <div className="flex justify-center mt-16 h-full">
        <div className="flex w-3/5 h-full">
          <div className="w-8/12 border border-black-100 h-[420px] mr-10"></div>
          <Remote />
        </div>
      </div>
    </div>
  );
}
