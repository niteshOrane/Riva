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
import Loader from "../../../../../../components/common/Loader/index";

function GoSellTap() {
  const dispatch = useDispatch();
  const { store_name } = useSelector((state) => state?.common?.store);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
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
      } else {
        return setLoading(false);
      }
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div className = {styles.tapLoader}>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className={styles.goSellWrap}>
        <FormControl component="fieldset">
          <RadioGroup onChange={callbackFunc}>
            <FormControlLabel value="card" control={<Radio />} label="Card" />
            {store_name === "Kuwait" && (
              <FormControlLabel value="knet" control={<Radio />} label="Knet" />
            )}
            {store_name === "Saudi Arabia" && (
              <FormControlLabel value="mada" control={<Radio />} label="Mada" />
            )}

            {store_name === "Bahrain" && (
              <FormControlLabel
                value="benefit"
                control={<Radio />}
                label="Benefit"
              />
            )}
          </RadioGroup>
        </FormControl>
        <br />
      </div>
      {/* <div style={{ marginTop: "20px" }}>
        {loading && <strong>Redirecting to payments page...</strong>}
      </div> */}
    </>
  );
}

export default GoSellTap;
