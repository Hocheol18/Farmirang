interface Props {
  labelcss: string;
  inputcss: string;
  placeholder: string;
  type: string;
  id: string;
  name: string;
  topcss: string;
  labeltext: string;
}

export default function Input({
  topcss,
  labeltext,
  labelcss,
  inputcss,
  placeholder,
  type,
  id,
  name,
}: Props) {
  return (
    <div className={topcss}>
      <div className={labelcss}>{labeltext}</div>

      <div className="relative mt-2">
        <div className="flex rounded-md border border-green-300 w-full">
          <input
            type={type}
            name={name}
            id={id}
            className={`focus:outline-none focus:ring-green-400 focus:ring-1 ${inputcss}`}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
}
