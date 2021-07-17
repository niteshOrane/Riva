import React from "react";

const ImageCard = ({ product }) => {
  console.log(product)
  return (
    <div>
      <img
        src={product.src}
        width="100%"
        className="object-fit-contain"
        alt="change me"
      />
    </div>
  );
};

export default ImageCard;
