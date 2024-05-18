"use client";

interface Props {
  text: any;
  bgStyles: string;
  textStyles: string;
  handleClick: () => void;
  buttonStyle?: string;
  children?: React.ReactNode;
}

const Button = ({
  children,
  text,
  bgStyles,
  textStyles,
  handleClick,
  buttonStyle,
}: Props) => {
  return (
    <button
      className={`${
        buttonStyle === "reset"
          ? bgStyles
          : bgStyles + " py-2 px-4 rounded-md shadow-lg"
      } `}
      onClick={handleClick}
    >
      <div className={`${textStyles} `}>{text}</div>
    </button>
  );
};

export default Button;
