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
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Card"
                />
                <span style = {{color:"gray"}} className="material-icons">credit_card</span>
              </div>
              {store_name === "Kuwait" && (
                <div className={styles.labelRadio}>
                  <FormControlLabel
                    value="knet"
                    control={<Radio />}
                    label="Knet"
                  />
                  <span style = {{color:"gray"}} className="material-icons">credit_card</span>
                </div>
              )}
              {store_name === "Saudi Arabia" && (
                <div className={styles.labelRadio}>
                  <FormControlLabel
           
                    value="mada"
                    control={<Radio />}
                    label="Mada"
                  />
                  <span style = {{color:"gray"}} className="material-icons">credit_card</span>
                </div>
              )}

              {store_name === "Bahrain" && (
                <div className={styles.labelRadio}>
                  <FormControlLabel
         
                    value="benefit"
                    control={<Radio />}
                    label="Benefit"
                  />
                  <span style = {{color:"lightgray"}} className="material-icons">credit_card</span>
                </div>
              )}
            </RadioGroup>
          </FormControl>
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
