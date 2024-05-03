interface Props {
  imgSrc: string;
  Title: string;
  contents: string;
}

export default function Card({ imgSrc, Title, contents }: Props) {
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white bg-clip-border rounded-xl w-10/12">
      <div className="relative h-64 mx-4 mt-6 overflow-hidden text-white bg-clip-border rounded-xl shadow-blue-gray-500/40">
        <img
          className="object-cover object-center w-full h-full"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
          alt="nature image"
        />
      </div>
      <div className="p-6">
        <p className="block text-h6 text-green-400">기부중</p>
        <h5 className="block mb-2 text-h2 font-bold antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {Title}
        </h5>
        <p className="block font-sans text-h6 antialiased font-light leading-relaxed text-inherit">
          {contents}
        </p>
      </div>
    </div>
  );
}
