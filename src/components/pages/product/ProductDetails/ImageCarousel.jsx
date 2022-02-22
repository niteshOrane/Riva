import React, { useState } from "react";
import LazyImage from "../../../common/LazyImage/Image";
import styles from "./productDetails.module.scss";
import { URL } from "../../../../util";

function ImageCarousel({ items, loadImg, showThumb, setShowThumb }) {
  const [thumpImg, setThumpImg] = useState(items?.[0]?.file);
  const handleThumbs = (file) => {
    setShowThumb(true);
    setThumpImg(file);
  };

  return (
    <div className={styles.imageCar}>
      <section className={styles.imageCarSec}>
        {items?.map((li) => (
          <div
            style={{
              border: thumpImg === li?.file ? "2px solid lightgray" : null,
            }}
            onClick={() => handleThumbs(li?.file)}
          >
            <LazyImage src={li?.file} width="100%" />
          </div>
        ))}
      </section>
      <main className={styles.mainImgWrapper}>
        <img
          className="object-fit-fill h-100"
          width="90%"
          src={showThumb ? `${URL.baseUrl}/${thumpImg}` : loadImg}
          alt="Product Image"
        />
      </main>
    </div>
  );
}

export default ImageCarousel;
