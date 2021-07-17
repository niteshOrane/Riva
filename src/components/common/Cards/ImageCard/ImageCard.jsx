import React from "react";

import Image from "../../LazyImage/Image";

const ImageCard = ({ product }) => {
  console.log(product)
  return (
    <div>
      <Image
        src={product.src}
        width="100%"
        className="object-fit-contain"
        alt="change me"
        type="product-details"
      />
    </div>
  );
};

export default ImageCard;
