import React from 'react';
import styles from './DescriptionComposition.module.scss';

const DescriptionComposition = ({ product, compositioncare, prodDiscr }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <p className={styles.title}>Description</p>
          <div className="opacity-7">
            <p>Model size: {prodDiscr?.selected?.size?.label}</p>
            <p>Model height: {product.modelHeight}</p>
            <p>Colour: {prodDiscr?.selected?.color?.label}</p>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: prodDiscr.description }}
            />
          </div>
        </div>
        <div className={styles.col}>
          <p className={styles.title}>
            {compositioncare?.data?.[0]?.composition_label || 'Composition'}
          </p>
          <strong className="my-10px d-inline-block">Outer</strong>
          <div className="my-10">
            <p className="opacity-7">{product.polyester}% polyester</p>
            <p className="opacity-7">{product.viscose}% viscose</p>
            <div className="mt-12px">
              <h3>{compositioncare?.data?.[0]?.care_label}</h3>
              <div className="mt-12px d-flex align-items-center gap-12px">
                <div title={compositioncare?.data?.[0]?.Wash}>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src={compositioncare?.data?.[0]?.Wash_image_url}
                    alt={compositioncare?.data?.[0]?.Wash}
                  />
                </div>
                <div title={compositioncare?.data?.[0]?.Iron}>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src={compositioncare?.data?.[0]?.Iron_image_url}
                    alt={compositioncare?.data?.[0]?.Iron}
                  />
                </div>
                <div title={compositioncare?.data?.[0]?.Dryclean}>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src={compositioncare?.data?.[0]?.Dryclean_image_url}
                    alt={compositioncare?.data?.[0]?.Dryclean}
                  />
                </div>
                <div title={compositioncare?.data?.[0]?.Tumble}>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src={compositioncare?.data?.[0]?.Tumble_image_url}
                    alt={compositioncare?.data?.[0]?.Tumble}
                  />
                </div>
                <div title={compositioncare?.data?.[0]?.Bleach}>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src={compositioncare?.data?.[0]?.Bleach_image_url}
                    alt={compositioncare?.data?.[0]?.Bleach}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionComposition;
