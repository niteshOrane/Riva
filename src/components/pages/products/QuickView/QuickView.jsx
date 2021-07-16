import React, { useState } from "react";
import Star from "@material-ui/icons/StarBorderOutlined";
import Dialog from "@material-ui/core/Dialog";
import styles from "./QuickView.module.scss";
import OutOfStock from "../../product/ProductDetails/outOfStock/OutOfStock";
import * as icons from "../../../common/Icons/Icons";
const closeStyle = {
  position: "absolute",
  top: 4,
  right: 4,
};
function QuickView({ open, handleClose }) {
  const [outOfStock, setOutOfStock] = useState(true);
  return (
    <Dialog
      fullWidth
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <button
        type="button"
        onClick={handleClose}
        style={closeStyle}
        className="bg-transparent no-border closeBtn"
      >
        <icons.Close />
      </button>

      <div className={styles.details}>
        <div className={styles.img}>
          <img
            src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/a9576483-1e21-4340-9719-1b8891611cf4.png"
            alt=""
          />
        </div>
        <form>
          <div className={styles.bestSeller}>BEST SELLER</div>
          <div className={styles.name}>Pine Printed Jersey T-Shirt</div>
          <div className="d-flex">
            <div className={`${styles.stars} d-flex-all-center`}>
              <Star style={{ fill: "#FFD700", fontSize: 16 }} />
              <Star style={{ fill: "#FFD700", fontSize: 16 }} />
              <Star style={{ fontSize: 16 }} />
              <Star style={{ fontSize: 16 }} />
              <Star style={{ fontSize: 16 }} />
            </div>
            <div className={`${styles.rating} d-flex-all-center`}>4 rating</div>
            <div className={`${styles.sku} d-flex`}>
              <div className={styles.title}>SKU:&nbsp;</div>
              <div className={styles.text}>101104-21009-798</div>
            </div>
          </div>
          <div className={`${styles.price} d-flex`}>
            <div className={styles.was}>Was $108.57</div>
            <div className={styles.now}>Now $75.90</div>
            <div className={styles.loyalty}>Earn Loyalty Points: 1*?</div>
          </div>
          <div className={`${styles.color} d-flex`}>
            <div className={styles.title}>Color:&nbsp;</div>
            <div className={styles.text}>Black</div>
            <div className={`${styles.options} d-flex-all-center`}>
              <div className={`${styles.option} ${styles.option_red}`}></div>
              <div
                className={`${styles.option} ${styles.option_oranage}`}
              ></div>
              <div className={`${styles.option} ${styles.option_blue}`}></div>
            </div>
          </div>
          <div className={`${styles.size} gap-12 d-flex align-items-center`}>
            <div className={styles.title}>Size:</div>
            <div
              className={`${styles.options} gap-12 d-flex align-items-center`}
            >
              1
            </div>
          </div>
          <div
            className={`${styles.outOfStock} d-flex align-items-center gap-12`}
          >
            <div className={`${styles.icon} d-flex-all-center`}>
              <span className="material-icons">mail</span>
            </div>
            <div className={styles.text}>
              We will let you know when its in stock
            </div>
          </div>
          <div className={`${styles.sizeHelp} d-flex align-items-center`}>
            <ul className="nav-list gap-12 d-flex align-items-center">
              <li className="nav-li">
                <a href="#" className="d-flex align-items-center">
                  <span className="material-icons-outlined font-light-black">
                    straighten
                  </span>
                  &nbsp; &nbsp;
                  <button
                    type="button"
                    className="bg-transparent no-border c-pointer"
                    //   onClick={() => setGuideCardOpen(true)}
                  >
                    <span className="align-self-end font-light-black">
                      Size Guide
                    </span>
                  </button>
                </a>
              </li>
              <li className="nav-li">
                <a href="#" className="d-flex align-items-center">
                  <span className="material-icons-outlined font-light-black">
                    search
                  </span>
                  &nbsp;
                  <button
                    type="button"
                    className="bg-transparent no-border c-pointer"
                    //   onClick={() => setSizeCardOpen(true)}
                  >
                    <span className="align-self-end font-light-black">
                      Find your size
                    </span>
                  </button>
                </a>
              </li>
            </ul>
          </div>

          <div className={`${styles.stats} d-flex justify-content-between`}>
            <div
              className={`${styles.visibility} d-flex gap-12 align-items-center`}
            >
              <div className={styles.icon}>
                <span className="material-icons-outlined font-light-black">
                  visibility
                </span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <div className="d-flex align-items-center justify-content-between flex-wrap my-20px">
              <div
                className={`${styles.quantity} d-flex align-items-center justify-content-between`}
              >
                <div className={styles.title}>Quantity:</div>
                <div
                  className={`${styles.counter} d-flex align-items-center justify-content-between`}
                >
                  <div>
                    <span className="material-icons-outlined font-light-black">
                      remove
                    </span>
                  </div>
                  <div>1</div>
                  <div>
                    <span className="material-icons-outlined font-light-black">
                      add
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.demand} d-flex gap-12 align-items-center`}
              >
                <div className="d-flex align-items-center">
                  <div className={styles.title}>Availability:hello </div>
                  &nbsp;<div className={styles.text}>In stock</div>
                </div>
              </div>
            </div>

            <div className="d-flex w-100 align-items-center ">
              {outOfStock ? (
                <OutOfStock />
              ) : (
                <div className={styles.addToCart}>
                  <button
                    //   onClick={addToCardHandler}
                    className="w-100 d-flex-all-center bg-black color-white p-12"
                  >
                    <span className="material-icons-outlined">
                      shopping_cart
                    </span>
                    &nbsp;ADD TO CART 
                  </button>
                </div>
              )}
              <div className={`${styles.wishlist} d-flex-all-center`}>
                <span className="material-icons-outlined font-light-black">
                  favorite_border
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default QuickView;
