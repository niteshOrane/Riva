import React from "react";
import styles from "./Information.module.scss";

function InformationGrid({ orderNumber, infoList }) {
  const { shippingAddress = { street: '', city: '', region: '', postcode: '' }, shippingDescription, payment } = infoList;
  const { street = '', city = '', region = '', postcode = '' } = shippingAddress;
  return (
    <div>
      <section className={styles.title}>
        <h2>Order Information</h2>
        <p>Order ID #{orderNumber}</p>
      </section>
      <div className={styles.mainBox}>
        <section className={styles.grid}>
          <div>
            <span className={styles.heading}>Shipping Address</span>
            <hr className={styles.divider} />
            <div className={styles.addr}>
              <p>{street?.[0]},</p>
              <p>{city},</p>
              <p>{region},</p>
              <p>{postcode}</p>
            </div>
          </div>
        </section>
        <section className={styles.grid}>
          <div>
            <span className={styles.heading}>Shipping Method</span>
            <hr className={styles.divider} />
            <div className={styles.addr}>
              <p>{shippingDescription}</p>
            </div>
          </div>
        </section>
        <section className={styles.grid}>
          <div>
            <span className={styles.heading}>Billing Address</span>
            <hr className={styles.divider} />
            <div className={styles.addr}>
              <p>{street?.[0]},</p>
              <p>{city},</p>
              <p>{region},</p>
              <p>{postcode}</p>
            </div>
          </div>
        </section>
        <section className={styles.grid}>
          <div>
            <span className={styles.heading}>Payment Method</span>
            <hr className={styles.divider} />
            <div className={styles.addr}>
              <p>{payment?.method}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default InformationGrid;
