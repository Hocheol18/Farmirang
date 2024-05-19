import Image from "next/image";

interface Props {
  imgSrc: string;
  Title: string;
  contents: string;
  progress: number;
}

export default function Card({
  imgSrc,
  Title,
  contents,
  progress,
}: Props) {
  let stateText;
  let stateClass;
  const progressBarWidth = `w-[${Math.round(progress * 100)}%]`;
  return (
    <div
      className={`relative flex flex-col mb-[10rem] text-gray-700 bg-white bg-clip-border rounded-xl w-10/12`}
    >
      <div
        className={`relative h-64 mx-4 mt-6 overflow-hidden text-white bg-clip-border rounded-xl shadow-blue-gray-500/40`}
      >
        <Image
          className={`object-cover object-center w-full h-full bg-white-300 ${stateClass} `}
          width={100}
          height={100}
          src={`${imgSrc}`}
          alt=""
        />
      </div>
     
      <div className="p-6">
        <p className="block text-h6 font-extrabold text-green-400">
          {stateText}
        </p>
        <h5 className="block mb-2 text-h2 font-bold antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {Title}
        </h5>
        <p className="block font-sans text-h5 antialiased font-light leading-relaxed text-inherit">
          {contents}
        </p>
        <div className="flex text-green-400 text-h6 font-bold mt-4 justify-end">
          현재 {Math.round(progress * 100)}%만큼 기부
        </div>
        <div className="flex-start flex h-2 w-full overflow-hidden rounded-full bg-gray-300 font-sans text-xs font-medium mt-2">
          <div
            className={`flex items-center justify-center h-full overflow-hidden text-white break-all bg-green-400 rounded-full ${progressBarWidth}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
