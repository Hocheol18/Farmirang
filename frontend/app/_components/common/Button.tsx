"use client";

interface Props {
  text: string;
  bgStyles: string;
  textStyles: string;
  handleClick: () => void;
}

const Button = ({ text, bgStyles, textStyles, handleClick }: Props) => {
  return (
    <button
      className={`${bgStyles} py-2 px-4 rounded-md shadow-lg`}
      onClick={handleClick}
    >
      <div className={`${textStyles} `}>{text}</div>
    </button>
  );
};

export default Button;
