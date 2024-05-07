import PropTypes from "prop-types";
import React from "react";

interface Props {
  children: string;
  variant: "outline" | "solid" | "subtle";
  colorScheme:
    | "teal"
    | "gray"
    | "blue"
    | "green"
    | "orange"
    | "pink"
    | "red"
    | "purple";
  className: any;
  contentClassName: any;
}

export const Badge = ({
  children,
  variant,
  colorScheme,
  className,
  contentClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`inline-flex items-start gap-[10px] px-[4px] py-0 rounded-[2px] relative ${
        variant === "outline" ? "border border-solid" : ""
      } ${
        colorScheme === "gray" && variant === "outline"
          ? "border-gray-500"
          : variant === "outline" && colorScheme === "blue"
          ? "border-blue-500"
          : variant === "outline" && colorScheme === "teal"
          ? "border-teal-500"
          : colorScheme === "green" && variant === "outline"
          ? "border-green-500"
          : variant === "outline" && colorScheme === "red"
          ? "border-red-500"
          : variant === "outline" && colorScheme === "purple"
          ? "border-purple-500"
          : variant === "outline" && colorScheme === "pink"
          ? "border-pink-500"
          : colorScheme === "orange" && variant === "outline"
          ? "border-orange-500"
          : ""
      } ${
        colorScheme === "gray" && variant === "solid"
          ? "bg-gray-500"
          : variant === "solid" && colorScheme === "blue"
          ? "bg-blue-500"
          : variant === "solid" && colorScheme === "teal"
          ? "bg-teal-500"
          : variant === "solid" && colorScheme === "green"
          ? "bg-green-500"
          : variant === "solid" && colorScheme === "red"
          ? "bg-red-500"
          : variant === "solid" && colorScheme === "purple"
          ? "bg-purple-500"
          : variant === "solid" && colorScheme === "pink"
          ? "bg-pink-500"
          : variant === "solid" && colorScheme === "orange"
          ? "bg-orange-500"
          : colorScheme === "gray" && variant === "subtle"
          ? "bg-gray-100"
          : variant === "subtle" && colorScheme === "blue"
          ? "bg-blue-100"
          : variant === "subtle" && colorScheme === "teal"
          ? "bg-teal-100"
          : variant === "subtle" && colorScheme === "green"
          ? "bg-green-100"
          : variant === "subtle" && colorScheme === "red"
          ? "bg-red-100"
          : variant === "subtle" && colorScheme === "purple"
          ? "bg-purple-100"
          : variant === "subtle" && colorScheme === "pink"
          ? "bg-pink-100"
          : colorScheme === "orange" && variant === "subtle"
          ? "bg-orange-100"
          : ""
      } ${className}`}
    >
      <div
        className={`w-fit mt-[-1.00px] tracking-[0] leading-[16px] whitespace-nowrap relative ${
          variant === "solid"
            ? "text-white-100"
            : variant === "subtle" && colorScheme === "blue"
            ? "text-blue-800"
            : variant === "subtle" && colorScheme === "teal"
            ? "text-teal-800"
            : variant === "subtle" && colorScheme === "green"
            ? "text-green-800"
            : variant === "subtle" && colorScheme === "red"
            ? "text-red-800"
            : variant === "subtle" && colorScheme === "purple"
            ? "text-purple-800"
            : variant === "subtle" && colorScheme === "pink"
            ? "text-pink-800"
            : colorScheme === "orange" && variant === "subtle"
            ? "text-yellow-800"
            : colorScheme === "gray" && variant === "outline"
            ? "text-gray-600"
            : variant === "outline" && colorScheme === "blue"
            ? "text-blue-600"
            : variant === "outline" && colorScheme === "teal"
            ? "text-teal-600"
            : colorScheme === "green" && variant === "outline"
            ? "text-green-600"
            : variant === "outline" && colorScheme === "red"
            ? "text-red-600"
            : variant === "outline" && colorScheme === "purple"
            ? "text-purple-600"
            : variant === "outline" && colorScheme === "pink"
            ? "text-pink-600"
            : colorScheme === "orange" && variant === "outline"
            ? "text-orange-600"
            : "text-gray-800"
        } ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

Badge.propTypes = {
  children: PropTypes.string,
  variant: PropTypes.oneOf(["outline", "solid", "subtle"]),
  colorScheme: PropTypes.oneOf([
    "teal",
    "gray",
    "blue",
    "green",
    "orange",
    "pink",
    "red",
    "purple",
  ]),
};
