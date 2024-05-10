interface Props {
  imgSrc: string;
  farmName: string;
  date: string;
}

export default function DesignCard({ imgSrc, date, farmName }: Props) {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white bg-clip-border rounded-xl w-10/12">
      <div className="flex py-3 px-6 justify-center">
        <p className="block text-[length:var(--m-h3-font-size)] text-green-400">
          {farmName}
        </p>
      </div>
      <div className="relative h-64 mx-2 overflow-hidden text-white bg-clip-border rounded-xl shadow-blue-gray-500/40">
        <img
          className="object-cover object-center w-full h-full"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
          alt="nature image"
        />
      </div>
      <div className="flex py-3 px-6 justify-end">
        <p className="block text-h6 text-gray-400">{date}</p>
      </div>
    </div>
  );
}
