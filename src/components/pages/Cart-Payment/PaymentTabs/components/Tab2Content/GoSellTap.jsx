import React, { useState } from "react";
import { GoSellElements } from "@tap-payments/gosell";
import styles from "./Tab2Content.module.scss";
import { cartPaymentTapAction } from "../../../../../../services/cart/cart.service";
import { showSnackbar } from "../../../../../../store/actions/common";
import { useDispatch, useSelector } from "react-redux";
import * as DATA_TYPES from "../../../../../../store/types";
import { useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";

function GoSellTap() {
  const { store_name } = useSelector((state) => state?.common?.store);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const callbackFunc = async (e) => {
    const subType = e.target.value;
    if (subType) {
      setLoading(true);
      const res = await cartPaymentTapAction(subType);
      if (
        res.status === 200 &&
        res.data &&
        res.data.length > 0 &&
        res.data[0]?.success
      ) {
        window.location.href = res.data?.[0]?.redirect_url;
        setLoading(false);
      } else if (res?.message) {
        dispatch(showSnackbar(`${res?.message}`, "error"));
        window.location.reload();
        return setLoading(false);
      } else {
        return setLoading(false);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <div className={styles.goSellWrap}>
        <form>
          <FormControl component="fieldset">
            <RadioGroup onChange={callbackFunc}>
              <div className={styles.labelRadio}>
                <span
                  style={{ color: "gray", paddingRight: "1rem" }}
                  className={`material-icons ${styles.line}`}
                >
                  credit_card
                </span>
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="VISA/MASTERCARD/AMEX"
                />
              </div>
              {store_name === "Kuwait" && (
                <div className={styles.labelRadio}>
                  <span style={{ color: "gray",paddingRight: "1rem" }} className="material-icons">
                    credit_card
                  </span>
                  <FormControlLabel
                    value="knet"
                    control={<Radio />}
                    label="KNET"
                  />
                </div>
              )}
              {store_name === "Saudi Arabia" && (
                <div className={styles.labelRadio}>
                  <span style={{ color: "gray", paddingRight: "1rem" }} className="material-icons">
                    credit_card
                  </span>
                  <FormControlLabel
                    value="mada"
                    control={<Radio />}
                    label="MADA DEBIT CARD"
                  />
                </div>
              )}

              {store_name === "Bahrain" && (
                <div className={styles.labelRadio}>
                  <span
                    style={{ color: "gray", paddingRight: "1rem" }}
                    className="material-icons"
                  >
                    credit_card
                  </span>
                  <FormControlLabel
                    value="benefit"
                    control={<Radio />}
                    label="BENEFIT"
                  />
                </div>
              )}
            </RadioGroup>
          </FormControl>
          <div className={styles.staticContent}>
            <span>
              Express Shipping in 3-6 Business Days. You will be redirected to
              the website of Mastercard Internet Gateway System (AMEX) when you
              place your order. And then you will automatically return to
              rivafashion.com.
            </span>
          </div>
        </form>

        <br />
      </div>
      <div style={{ marginTop: "20px" }}>
        {loading && <strong>Redirecting to payments page...</strong>}
      </div>
    </>
  );
}

export default GoSellTap;
