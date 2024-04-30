"use client";

interface Props {
  text: string;
  bgColor: string;
  textColor: string;
}

const Button = ({ text, bgColor, textColor }: Props) => {
  return (
    <div className={`${bgColor} py-2 px-4 rounded-md shadow shadow-md`}>
      <button className={`${textColor} font-semibold text-h4`}>{text}</button>
    </div>
  );
};

export default Button;
