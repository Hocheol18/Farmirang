import Remote from "../component/Remote";

import DonationList from "../component/DonationList";
import Participate from "../component/Participate";

export default function DonationDetailPage() {
  const number = 25;
  const count = 6;
  return (
    <div className="w-full pb-[10rem] mt-[10rem]">
      <div className="flex justify-center text-h1 font-bold text-green-400">기부중</div>
      <div className="flex justify-center text-[70px] font-extrabold">동네 주민에게 사랑을</div>
      <div className="flex justify-center mt-16 h-full">
        <div className="flex w-4/5 h-full">
          <div className="w-8/12 mr-10">
            <div className="w-full border border-black-100 h-[420px]"></div>
            <div className="flex justify-end mt-10">
              <div className="w-4/5">
                <div className="border border-black-100 w-full h-[10rem]"></div>

                {/*  */}
                <div className="text-h6 mt-10 leading-10">
                  <div>
                    "별빛내리는마을"은 어린이를 위한 아동공동생활가정으로,
                  </div>
                  <div>
                    가정 내에서 안전하고 안정된 환경을 제공하여 아동의 성장과
                    발달을 도모하는 곳입니다.
                  </div>
                  <div>
                    전문적인 교육자와 간병인이 함께 협력하여 아동들에게 필요한
                    돌봄, 교육, 정서지원을 제공합니다.
                  </div>
                  <div>
                    이곳은 어린이들이 가정 분위기에서 자연스럽게 성장하고,
                  </div>
                  <div>
                    사회적 기술과 감정적 안정을 쌓을 수 있도록 도와줍니다.
                  </div>
                  <div className="mb-10">
                    다양한 교육 활동을 통해 아동들은 자신의 잠재력을 발휘하고
                    다양한 경험을 쌓을 수 있습니다.
                  </div>
                  <div>
                    뿐만 아니라, "별빛내리는마을"은 아동의 개인적인 성향과
                    특성을 고려하여 맞춤형 지원을 제공합니다.
                  </div>
                  <div>
                    각 아동의 Bedside Life로 불리는 일일 생활계획을 통해
                    개인적인 Bedtime 및 일정이 지켜지며,
                  </div>
                  <div>아동 개개인의 특성에 맞게 맞춤형 지원을 제공합니다.</div>
                  <div>
                    또한, 지역사회와의 연계를 강화하여 아동들이 사회와 조화롭게
                    교류할 수 있도록 도움을 주고 있습니다.
                  </div>

                  <div>
                    "별빛내리는마을"은 아동들에게 따뜻하고 안전한 보금자리를
                    제공하여,
                  </div>
                  <div>포그들의 행복하고 건강한 성장을 지원하고 있습니다.</div>
                </div>

                {/* 기부 목록 */}
                <DonationList />

                {/* 참가자 목록 */}
                <Participate />
              </div>
            </div>
          </div>
          <Remote />
        </div>
      </div>
    </div>
  );
}
