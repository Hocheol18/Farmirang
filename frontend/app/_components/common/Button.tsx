"use client";

interface Props {
  text: string;
  bgStyles: string;
  textStyles: string;
  handleClick: () => void;
  children? : React.ReactNode;
}

const Button = ({ children, text, bgStyles, textStyles, handleClick }: Props) => {
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
