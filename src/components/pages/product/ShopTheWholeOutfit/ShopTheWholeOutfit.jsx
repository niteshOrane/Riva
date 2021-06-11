import React from 'react';
import styles from './shopTheWholeOutfit.module.scss';
import HorizontalProductCard from '../../../common/Cards/ProductCard/HorizontalProductCard';
import { PieChart } from 'react-minimal-pie-chart';

const ShopTheWholeoutfit = ({ data }) => {
    return (
        <div className={styles.wholeOutfit}>
            <div className={styles.header}>Shop the Whole Outfit</div>
            <div className={styles.sections}>
                <div className={styles.primaryProduct}>
                    <div><img src={data.mainCard.src} /></div>
                    <div className={styles.name}>{data.mainCard.name}</div>
                    <div className={styles.sku}>{data.mainCard.sku}</div>
                    <div className={styles.description}>{data.mainCard.description}</div>
                </div>
                <div>
                    {data.smallcards.map((product) => <div>
                        <HorizontalProductCard product={product} />
                        <hr className="my-10px" />
                    </div>)}
                </div>
                <div className={styles.cart}>
                    <div className={styles.header}>Get 10% discount - select all products</div>
                    <div>
                        <div className={styles.pie}>
                            <PieChart
                                data={[
                                    { title: 'One', value: data.discount.selectedProducts, color: '#fe6f61' },
                                    { title: 'Two', value: data.discount.totalProducts - data.discount.selectedProducts, color: '#b2aeae' },
                                ]}
                                lineWidth={5}
                                label={() => `${data.discount.selectedProducts}/${data.discount.totalProducts}`}
                                labelPosition={0}
                            />
                        </div>
                        <div className={styles.selectedCount}>{data.discount.selectedProducts} out of {data.discount.totalProducts} products selected</div>
                    </div>
                    {
                        data.discount.discounts.map((discount) => <div className={`${styles.discount} d-flex p-12 justify-content-between`}>
                            <div className={styles.name}>{discount.name}</div>
                            <div className={styles.total}>USD {discount.amount}</div>
                        </div>)
                    }
                    <hr />
                    <div className={`${styles.discount} d-flex p-12 justify-content-between`}>
                        <div className={styles.name}>{data.discount.selectedProducts} items | Subtotal</div>
                        <div className={styles.total}>USD {data.discount.total}</div>
                    </div>
                    <div className={styles.addToCart}>
                        <span className={styles.text}>Add {data.discount.totalProducts} of {data.discount.totalProducts} items to cart</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopTheWholeoutfit;