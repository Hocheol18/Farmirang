import React from "react";

interface Props {
  cropList: { r: number; c: number; cropId: number }[];
  cell: number;
  spacing: { cropSpacing: number; ridgeSpacing: number }[];
  rLen: number;
  cLen: number;
}

const DynamicField = ({ cropList, cell, spacing, rLen, cLen }: Props) => {
  let cropSpacing = spacing[cropList[0].cropId].cropSpacing;
  let ridgeSpacing = spacing[cropList[0].cropId].ridgeSpacing;
  if (cell === 13 || cell === 14) {
    cropSpacing = spacing[cropList[1].cropId].cropSpacing;
    ridgeSpacing = spacing[cropList[1].cropId].ridgeSpacing;
  }
  const width = `${(cropSpacing / rLen) * 100}%`;
  const height = `${(ridgeSpacing / cLen) * 100}%`;

  return (
    <div
      className="bg-blue-400"
      // style={{
      //   width,
      //   height,
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}
    >
      {cell}
    </div>
  );
};

export default DynamicField;
