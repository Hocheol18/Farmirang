import Card from "./component/Card";
import { BASE_URL } from "@/utils/ServerApi";
import Spinner from "../_components/common/Spinner";
import AosComponent from "./component/AosComponent";
import Posts from "../farm-diary/[diaryid]/page";

// 데이터 가져오기
const fetchDatas = async () => {
  const response = await fetch(`${BASE_URL}/api/v1/field/1`, {
    cache: "no-store", // 매 요청마다 패치됨
    method: "GET",
  });

  return response.json();
};

// 컴포넌트 작성
function Display() {
  return (
    <>
      <div className="w-full h-full">
        <AosComponent />
        <div className="flex justify-center mt-[10rem] pb-[8rem]">
          <div className="w-11/12">
            <div className="relative w-full grid grid-cols-3 ml-[4rem]">
              <div className="text-h1">모금중인 기부</div>
              <div className="bg-yellow-100 w-[17rem] h-6 rounded-xl absolute top-10 left-0 z-[-1] opacity-70"></div>
            </div>
            <div className="w-full grid grid-cols-3">
              <div className="flex justify-center">
                <Card
                  imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                  contents="The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to Naviglio where you can enjoy the main night life in
      Barcelona."
                  Title="아이들에게 사랑을"
                />
              </div>
              <div className="flex justify-center">
                <Card
                  imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                  contents="The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to Naviglio where you can enjoy the main night life in
      Barcelona."
                  Title="아이들에게 사랑을"
                />
              </div>
              <div className="flex justify-center">
                <Card
                  imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                  contents="The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to Naviglio where you can enjoy the main night life in
      Barcelona."
                  Title="아이들에게 사랑을"
                />
              </div>
              <div className="flex justify-center">
                <Card
                  imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                  contents="The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to Naviglio where you can enjoy the main night life in
      Barcelona."
                  Title="아이들에게 사랑을"
                />
              </div>
              <div className="flex justify-center">
                <Card
                  imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                  contents="The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to Naviglio where you can enjoy the main night life in
      Barcelona."
                  Title="아이들에게 사랑을"
                />
              </div>
              <div className="flex justify-center">
                <Card
                  imgSrc="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                  contents="The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to Naviglio where you can enjoy the main night life in
      Barcelona."
                  Title="아이들에게 사랑을"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pb-32"></div>
      </div>
    </>
  );
}

export default async function Donation() {
  const res = await fetchDatas();
  
  return (
    <>
      {JSON.stringify(res)}
     
      <Display />
    </>
  );
}
