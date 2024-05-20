import PropTypes from "prop-types";
import React from "react";

interface Props {
  badge: boolean;
  src: string;
  name1: boolean;
  src1: boolean;
  size: "sm" | "xs" | "lg" | "two-xl" | "xl" | "md";
  className: any;
  srcClassName: any;
  nameClassName: any;
  image: string;
}

export const Avatar = ({
  badge = true,
  src = " ",
  name1,
  src1,
  size,
  className,
  srcClassName,
  nameClassName,
  image = "/user/user.png",
}: Props): JSX.Element => {
  return (
    <div
      className={`rounded-full relative ${
        size === "sm"
          ? "w-[32px]"
          : size === "md"
          ? "w-[48px]"
          : size === "lg"
          ? "w-[64px]"
          : size === "xl"
          ? "w-[96px]"
          : size === "two-xl"
          ? "w-[128px]"
          : "w-[24px]"
      } ${src1 ? "flex" : ""} ${src1 ? "items-center" : ""} ${
        src1 ? "gap-[10px]" : ""
      } ${
        size === "sm"
          ? "h-[32px]"
          : size === "md"
          ? "h-[48px]"
          : size === "lg"
          ? "h-[64px]"
          : size === "xl"
          ? "h-[96px]"
          : size === "two-xl"
          ? "h-[128px]"
          : "h-[24px]"
      } ${src1 ? "justify-center" : ""} ${
        name1 && !src1 ? "bg-blue-300" : "bg-gray-400"
      } ${className}`}
    >
      {src1 && (
        <>
          <div
            className={`[font-family:'Inter-Medium',Helvetica] left-0 tracking-[0] text-[1px] -top-px text-black font-medium text-center leading-[normal] absolute ${
              size === "sm"
                ? "w-[32px]"
                : size === "md"
                ? "w-[48px]"
                : size === "lg"
                ? "w-[64px]"
                : size === "xl"
                ? "w-[96px]"
                : size === "two-xl"
                ? "w-[128px]"
                : "w-[24px]"
            } ${
              size === "sm"
                ? "h-[32px]"
                : size === "md"
                ? "h-[48px]"
                : size === "lg"
                ? "h-[64px]"
                : size === "xl"
                ? "h-[96px]"
                : size === "two-xl"
                ? "h-[128px]"
                : "h-[24px]"
            } ${srcClassName}`}
          >
            {src}
          </div>
          <div
            className={`[font-family:'Inter-Medium',Helvetica] left-0 tracking-[0] -top-px text-black font-medium text-center leading-[normal] absolute ${
              size === "sm"
                ? "w-[32px]"
                : size === "md"
                ? "w-[48px]"
                : size === "lg"
                ? "w-[64px]"
                : size === "xl"
                ? "w-[96px]"
                : size === "two-xl"
                ? "w-[128px]"
                : "w-[24px]"
            } ${
              size === "sm"
                ? "text-[12px]"
                : size === "md"
                ? "text-[20px]"
                : size === "lg"
                ? "text-[24px]"
                : size === "xl"
                ? "text-[38px]"
                : size === "two-xl"
                ? "text-[48px]"
                : "text-[9px]"
            } ${
              size === "sm"
                ? "h-[32px]"
                : size === "md"
                ? "h-[48px]"
                : size === "lg"
                ? "h-[64px]"
                : size === "xl"
                ? "h-[96px]"
                : size === "two-xl"
                ? "h-[128px]"
                : "h-[24px]"
            } ${nameClassName}`}
          ></div>
          <img
            className="rounded-full self-stretch grow flex-1 object-cover relative"
            alt="Image"
            src={
              size === "sm"
                ? "/user/user.png"
                : size === "md"
                ? "/user/user.png"
                : size === "lg"
                ? image
                : size === "xl"
                ? "/user/user.png"
                : size === "two-xl"
                ? "/user/user.png"
                : "image.png"
            }
          />
        </>
      )}

      {!name1 && (
        <img
          className={`rounded-full absolute ${
            size === "sm"
              ? "w-[21px]"
              : size === "md"
              ? "w-[32px]"
              : size === "lg"
              ? "w-[43px]"
              : size === "xl"
              ? "w-[64px]"
              : size === "two-xl"
              ? "w-[85px]"
              : "w-[16px]"
          } ${
            size === "sm"
              ? "left-[5px]"
              : size === "md"
              ? "left-[8px]"
              : size === "lg"
              ? "left-[11px]"
              : size === "xl"
              ? "left-[16px]"
              : size === "two-xl"
              ? "left-[21px]"
              : "left-[4px]"
          } ${
            size === "sm"
              ? "top-[4px]"
              : size === "md"
              ? "top-[6px]"
              : size === "lg"
              ? "top-[8px]"
              : size === "xl"
              ? "top-[12px]"
              : size === "two-xl"
              ? "top-[16px]"
              : "top-[3px]"
          } ${
            size === "sm"
              ? "h-[25px]"
              : size === "md"
              ? "h-[38px]"
              : size === "lg"
              ? "h-[51px]"
              : size === "xl"
              ? "h-[76px]"
              : size === "two-xl"
              ? "h-[101px]"
              : "h-[19px]"
          }`}
          alt="Svg"
          src={
            size === "sm"
              ? "image.svg"
              : size === "md"
              ? "svg-2.svg"
              : size === "lg"
              ? "svg-3.svg"
              : size === "xl"
              ? "svg-4.svg"
              : size === "two-xl"
              ? "svg-5.svg"
              : "svg.svg"
          }
        />
      )}

      {(src1 || !name1) && (
        <>
          <>
            {badge && (
              <div
                className={`border-white bg-green-500 absolute ${
                  size === "xs"
                    ? "border border-solid"
                    : size === "sm"
                    ? "border-2 border-solid"
                    : size === "xl"
                    ? "border-[5px] border-solid"
                    : size === "two-xl"
                    ? "border-8 border-solid"
                    : "border-[3px] border-solid"
                } ${
                  size === "xs"
                    ? "w-[8px]"
                    : size === "sm"
                    ? "w-[12px]"
                    : size === "xl"
                    ? "w-[34px]"
                    : size === "two-xl"
                    ? "w-[56px]"
                    : "w-[22px]"
                } ${
                  size === "sm"
                    ? "left-[20px]"
                    : size === "md"
                    ? "left-[31px]"
                    : size === "lg"
                    ? "left-[43px]"
                    : size === "xl"
                    ? "left-[65px]"
                    : size === "two-xl"
                    ? "left-[88px]"
                    : "left-[17px]"
                } ${
                  size === "sm"
                    ? "top-[22px]"
                    : size === "md"
                    ? "top-[31px]"
                    : size === "lg"
                    ? "top-[43px]"
                    : size === "xl"
                    ? "top-[65px]"
                    : size === "two-xl"
                    ? "top-[88px]"
                    : "top-[17px]"
                } ${
                  size === "xs"
                    ? "h-[8px]"
                    : size === "sm"
                    ? "h-[12px]"
                    : size === "xl"
                    ? "h-[34px]"
                    : size === "two-xl"
                    ? "h-[56px]"
                    : "h-[22px]"
                } ${
                  size === "xs"
                    ? "rounded-[4px]"
                    : size === "sm"
                    ? "rounded-[6px]"
                    : size === "xl"
                    ? "rounded-[17px]"
                    : size === "two-xl"
                    ? "rounded-[28px]"
                    : "rounded-[11px]"
                }`}
              />
            )}
          </>
        </>
      )}

      {name1 && !src1 && (
        <>
          <div
            className={`[font-family:'Inter-Medium',Helvetica] left-0 tracking-[0] -top-px text-black font-medium text-center leading-[normal] absolute ${
              size === "sm"
                ? "w-[32px]"
                : size === "md"
                ? "w-[48px]"
                : size === "lg"
                ? "w-[64px]"
                : size === "xl"
                ? "w-[96px]"
                : size === "two-xl"
                ? "w-[128px]"
                : "w-[24px]"
            } ${
              size === "sm"
                ? "text-[12px]"
                : size === "md"
                ? "text-[20px]"
                : size === "lg"
                ? "text-[24px]"
                : size === "xl"
                ? "text-[38px]"
                : size === "two-xl"
                ? "text-[48px]"
                : "text-[9px]"
            } ${
              size === "sm"
                ? "h-[32px]"
                : size === "md"
                ? "h-[48px]"
                : size === "lg"
                ? "h-[64px]"
                : size === "xl"
                ? "h-[96px]"
                : size === "two-xl"
                ? "h-[128px]"
                : "h-[24px]"
            }`}
          ></div>
          <>
            {badge && (
              <div
                className={`border-white bg-green-500 absolute ${
                  size === "xs"
                    ? "border border-solid"
                    : size === "sm"
                    ? "border-2 border-solid"
                    : size === "xl"
                    ? "border-[5px] border-solid"
                    : size === "two-xl"
                    ? "border-8 border-solid"
                    : "border-[3px] border-solid"
                } ${
                  size === "xs"
                    ? "w-[8px]"
                    : size === "sm"
                    ? "w-[12px]"
                    : size === "xl"
                    ? "w-[34px]"
                    : size === "two-xl"
                    ? "w-[56px]"
                    : "w-[22px]"
                } ${
                  size === "sm"
                    ? "left-[20px]"
                    : size === "md"
                    ? "left-[31px]"
                    : size === "lg"
                    ? "left-[43px]"
                    : size === "xl"
                    ? "left-[65px]"
                    : size === "two-xl"
                    ? "left-[88px]"
                    : "left-[17px]"
                } ${
                  size === "sm"
                    ? "top-[22px]"
                    : size === "md"
                    ? "top-[31px]"
                    : size === "lg"
                    ? "top-[43px]"
                    : size === "xl"
                    ? "top-[65px]"
                    : size === "two-xl"
                    ? "top-[88px]"
                    : "top-[17px]"
                } ${
                  size === "xs"
                    ? "h-[8px]"
                    : size === "sm"
                    ? "h-[12px]"
                    : size === "xl"
                    ? "h-[34px]"
                    : size === "two-xl"
                    ? "h-[56px]"
                    : "h-[22px]"
                } ${
                  size === "xs"
                    ? "rounded-[4px]"
                    : size === "sm"
                    ? "rounded-[6px]"
                    : size === "xl"
                    ? "rounded-[17px]"
                    : size === "two-xl"
                    ? "rounded-[28px]"
                    : "rounded-[11px]"
                }`}
              />
            )}
          </>
        </>
      )}
    </div>
  );
};

Avatar.propTypes = {
  badge: PropTypes.bool,
  name: PropTypes.string,
  src: PropTypes.string,
  name1: PropTypes.bool,
  src1: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "xs", "lg", "two-xl", "xl", "md"]),
  image: PropTypes.string,
};
