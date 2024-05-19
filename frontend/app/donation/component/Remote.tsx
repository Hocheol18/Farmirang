import { fetchDonationListData } from "@/api/farm-donation";
import FirstModal from "../[donationId]/component/FirstModal";

interface Props {
  progress: number;
  startDate: string;
  endDate: string;
  address: string;
  donationId: number;
  donationItem: Array<{
    crop_id: number;
    id: number;
    amount: number;
    unit: string;
    current: number;
  }>;
}

export default async function Remote({
  progress,
  startDate,
  endDate,
  address,
  donationId,
  donationItem,
}: Props) {
  const donationListData = await fetchDonationListData(donationId);
  const totalCrops = donationItem.length;
  const totalPeople = donationListData.data.donors.length;
  const completeCrops = donationItem.filter(
    (item) => item.current >= item.amount
  );
  const remainCrops = donationItem.filter((item) => item.current < item.amount);

  const progressBarWidth = `w-[${Math.round(progress * 100)}%]`;

  return (
    <div className="sticky top-[7rem] w-[22rem] border border-black-100 h-[420px] rounded-xl p-8">
      <div className="flex justify-end">
        <div className="text-green-400 text-h2 font-bold">
          {Math.round(progress * 100)}%
        </div>
      </div>

      <div className="flex-start flex h-2 w-full overflow-hidden rounded-full bg-gray-300 font-sans text-xs font-medium">
        <div
          className={`flex items-center justify-center h-full overflow-hidden text-white break-all bg-green-400 rounded-full`}
          style={{ width: `${Math.round(progress * 100)}%` }}
        ></div>
      </div>
      <div className="mt-2">
        <span className="text-l mr-2 font-bold">일정</span>
        <span className="text-l mr-2">{startDate.slice(0, 10)} ~</span>
        <span className="text-l">{endDate.slice(0, 10)}</span>
      </div>
      <div className="grid grid-rows divide-y divide-gray-400 h-[12rem] mt-2 mb-2">
        <div className="flex flex-col justify-center">
          <div className="flex justify-between">
            <p className="text-h6 font-bold">모금작물</p>
            <p className="text-h6">{totalCrops}종</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex justify-between">
            <p className="text-h6 font-bold">모금완료까지</p>
            <p className="text-h6">{remainCrops.length}종</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex justify-between">
            <p className="text-h6 font-bold">참여인원</p>
            <p className="text-h6">{totalPeople}명</p>
          </div>
        </div>
      </div>
      <FirstModal address={address} remainCrops={remainCrops} />
    </div>
  );
}
