`use client`;

interface Props {
  labelcss: string;
  inputcss: string;
  placeholder: string;
  type: string;
  value: any;
  topcss: string;
  labeltext: string;
  onChange: (value: any) => void;

}

export default function Input({
  topcss,
  labeltext,
  labelcss,
  inputcss,
  placeholder,
  type,
  value,
  onChange,

}: Props) {
  return (
    <div className={topcss}>
      <div className={labelcss}>{labeltext}</div>

      <div className="relative mt-2">
        <div className={`flex rounded-lg`}>
          <input
            type={type}
            value={value}
            className={`focus:outline-none focus:ring-green-400 focus:ring-1 ${inputcss}`}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
