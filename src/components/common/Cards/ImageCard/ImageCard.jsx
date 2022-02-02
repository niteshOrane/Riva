import React from "react";

import Image from "../../LazyImage/Image";

const ImageCard = ({ product, count }) => {
  return (
    <div>
      <Image
        src={product.src}
        width={count > 1 ? '100%' : "auto"}
        className="object-fit-contain"
        alt="change me"
        type="product-details"
      />
    </div>
  );
};

export default ImageCard;
