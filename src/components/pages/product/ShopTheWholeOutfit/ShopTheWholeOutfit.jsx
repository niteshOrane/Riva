import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Checkbox from '@material-ui/core/Checkbox';
import HorizontalProductCard from '../../../common/Cards/ProductCard/HorizontalProductCard';
import Image from '../../../common/LazyImage/Image';
import styles from './shopTheWholeOutfit.module.scss';

const ShopTheWholeoutfit = ({ mainProd, data }) => {
  const [selected, setSelected] = useState([]);

  const handleSelected = (checked, product) => {
    if (checked) setSelected(selected.filter((c) => c.id !== product.id));
    else setSelected((s) => [...s, product]);
  };

  return (
    <div className={styles.wholeOutfit}>
      <div className={styles.header}>Shop the Whole Outfit</div>
      <div className={styles.sections}>
        <div className={styles.primaryProduct}>
          <div>
            <Image src={mainProd.image} type="product-details" width="400px" />
          </div>
          <div className={styles.name}>{mainProd.name}</div>
          <div className={styles.sku}>
            <span className="color-black">SKU:</span> {mainProd.sku}
          </div>
          {/* <div className={styles.description}>{data.mainCard.description}</div> */}
        </div>
        <div>
          {data.map((product) => (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, left: -10 }}>
                {' '}
                <Checkbox
                  checked={selected.find((s) => s.id === product.id)}
                  color="default"
                  onClick={(e) => handleSelected(!e.target.checked, product)}
                />{' '}
              </div>
              <HorizontalProductCard product={product} />
              <hr className="my-10px" />
            </div>
          ))}
        </div>
        <div className={styles.cart}>
          <div className={styles.header}>
            Get 10% discount - select all products
          </div>
          <div>
            <div className={styles.pie}>
              <PieChart
                data={[
                  {
                    title: 'One',
                    value: selected.length,
                    color: 'black',
                  },
                  {
                    title: 'Two',
                    value: data.length - selected.length,
                    color: '#b2aeae',
                  },
                ]}
                lineWidth={5}
                label={() => `${selected.length}/${data.length}`}
                labelPosition={0}
              />
            </div>
            <div className={styles.selectedCount}>
              {selected.length} out of {data.length} products selected
            </div>
          </div>
          {data?.discount?.discounts?.map((discount) => (
            <div
              className={`${styles.discount} d-flex p-12px justify-content-between`}
            >
              <div className={styles.name}>{discount.name}</div>
              <div className={styles.total}>USD {discount.amount}</div>
            </div>
          ))}
          <hr />
          <div
            className={`${styles.discount} d-flex p-12px justify-content-between`}
          >
            <div className={styles.name}>
              {selected.length} items | Subtotal
            </div>
            <div className={styles.total}>
              USD {selected.reduce((t, s) => s.priceWithoutCurrency + t, 0)}
            </div>
          </div>
          <div className={styles.addToCart}>
            <span className={styles.text}>
              Add {selected.length} of {data.length} items to cart
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopTheWholeoutfit;
