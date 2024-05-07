import Card from "./component/Card";

export default function Donation() {
  return (
    <div className="w-full h-full">
      <div>
        <div className="flex justify-center mt-32">
          <span className="font-bold text-h1">팜이랑과 함께하는</span>
          <span className="font-bold text-h1 text-green-400 ml-4">기부</span>
        </div>

        <div className="w-full mt-14">
          <div className="text-h5 flex justify-center">기부,</div>
          <div className="text-h5 flex justify-center">어렵지 않아요.</div>
          <div className="text-h5 flex justify-center">
            팜이랑과 함께라면 쉬워집니다.
          </div>
          <div className="text-h5 flex justify-center">지금 시작해보세요!</div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-10/12">
          <div className="relative mt-32">
            <div className="text-h1 z-10">모금중인 기부</div>
            <div className="bg-yellow-100 w-[17rem] h-6 rounded-xl absolute top-10 left-0 z-0 opacity-70"></div>
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
