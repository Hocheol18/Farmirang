import Card from "./component/Card";

export default function Donation() {
  return (
    <div className="w-full h-full">
      <div>
        <div className="flex justify-center mt-32">
          <span className="font-bold text-h1">팜이랑과 함께하는</span>
          <span className="font-bold text-h1 text-green-400 ml-4">기부</span>
        </div>

        <div className="w-full mt-14 leading-10">
          <div className="text-h5 font-semibold flex justify-center">
            봄, 여름, 가을, 그리고 겨울
          </div>
          <div className="text-h5 font-semibold flex justify-center mb-8">
            팜이랑은 가장 먼저 주변의 힘든 이웃을 도왔습니다.
          </div>
          <div className="text-h5 font-semibold flex justify-center">기부,</div>
          <div className="text-h5 font-semibold flex justify-center">어렵지 않아요.</div>
          <div className="text-h5 font-semibold flex justify-center">
            팜이랑과 함께라면 쉬워집니다.
          </div>
          <div className="text-h5 font-semibold flex justify-center">지금 시작해보세요!</div>
        </div>
      </div>

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
  );
}
