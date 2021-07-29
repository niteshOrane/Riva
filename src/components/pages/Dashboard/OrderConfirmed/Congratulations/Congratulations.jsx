import React from "react";
import * as icons from "../../../../common/Icons/Icons";
import styles from "./Congratulations.module.scss";
function Congratulations({displayOrderNumber, orderId}) {
  return (
    <div className={styles.container}>
      <icons.Congratulations />
      <h3 className={styles.congrats}>Congratulations!</h3>
      <h3 className={styles.greyText}>Your order -{displayOrderNumber || ''} is accepted</h3>
      {/*<p>Your 1 item will be delivered by Mon, 24 May 2021</p>*/}
    </div>
  );
}

export default Congratulations;
