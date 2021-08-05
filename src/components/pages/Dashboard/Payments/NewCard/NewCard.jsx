import React from "react";
import * as icons from "../../../../common/Icons/Icons";
import styles from "./NewCard.module.scss";

const NewCard = ({
  addingNewCard,
  handleAddCard,
  values,
  handleChange,
  handleSaveCard,
}) => {
  return (
    <div>
      {!addingNewCard ? (
        <button
          onClick={handleAddCard}
          className={styles.addNewCard}
          title="ADD A NEW CARD"
        >
          <span class="material-icons-outlined">add</span>
          <h4 className={styles.addCardText}>ADD A NEW CARD</h4>
        </button>
      ) : (
        <form>
          <div className={styles.formData}>
            <div className="d-flex gap-12px align-items-center justify-content-between">
              <div className={styles.inpContainer}>
                <p>Enter Card Number</p>
                <input
                  onChange={handleChange}
                  type="text"
                  name="cardNumber"
                  value={values.cardNumber}
                  id="cardNumber"
                />
              </div>
              <div className={styles.inpContainer}>
                <p>Name on Card</p>
                <input
                  onChange={handleChange}
                  type="text"
                  name="nameOnCard"
                  value={values.nameOnCard}
                  id="cardNumber"
                />
              </div>
            </div>
            <div className="mt-12px">
              <p>Valid Thru</p>
              <div className={styles.monthYear}>
                <div className={styles.parent}>
                  <div className="d-flex align-items-center gap-12px c-pointer">
                    MM <icons.AngleDown />
                  </div>
                </div>
                <div className={styles.parent}>
                  <div className="d-flex align-items-center gap-12px c-pointer">
                    YY <icons.AngleDown />
                  </div>
                </div>
              </div>
              <p className="mt-12px greyText font-size-small">
                Your card details would be securely saved for faster payments.
                Your CVV will not be stored
              </p>
            </div>
          </div>
          <button onClick={handleSaveCard} className={styles.saveBtn}>
            SAVE THIS CARD
          </button>
        </form>
      )}
    </div>
  );
};

export default NewCard;
