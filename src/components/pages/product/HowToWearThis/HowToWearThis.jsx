import React from "react";
import ProductGoWithCard from "../../../common/Cards/ProductGoWithCard/ProductGoWithCard";
import SectionHeader from "../../../common/SectionHeader/SectionHeader";
import styles from "./howToWearThis.module.scss";

const HowToWearThis = (props) => {
  return (
    <div className=" container-90 max-width-1600 mx-auto">
      <div className={styles.howToWearThis}>
        <div className={styles.sectionHeaderContainer}>
          <h4 className="section-title">How to Wear it</h4>
        </div>
        <div className={styles.cards}>
          {props.cards.map((card, i) => {
            return <ProductGoWithCard i={i} product={card} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HowToWearThis;
