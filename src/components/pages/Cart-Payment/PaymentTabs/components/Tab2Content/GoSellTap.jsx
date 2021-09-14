import React from "react";
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

function GoSellTap() {
  const dispatch = useDispatch();
  const {store_name} = useSelector(state => state?.common?.store);
  const history = useHistory();
  const callbackFunc = async (e) => {
    const subType = e.target.value;
    if (subType) {
      const res = await cartPaymentTapAction(subType);
      if (
        res.status === 200 &&
        res.data &&
        res.data.length > 0 &&
        res.data[0]?.success
      ) {
        window.location.href = res.data?.[0]?.redirect_url;
      }
    }
  };
  return (
    <div className={styles.goSellWrap}>
      <FormControl component="fieldset">
        <RadioGroup onChange={callbackFunc}>
          <FormControlLabel value="card" control={<Radio />} label="card" />
          {store_name=== "Kuwait" &&  <FormControlLabel value="knet" control={<Radio />} label="knet" />}
          {store_name==="Saudi Arabia" && <FormControlLabel value="mada" control={<Radio />} label="mada" />}
          
         {store_name=== "Bahrain" &&  <FormControlLabel
            value="benefit"
            control={<Radio />}
            label="benefit"
          />}
         
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default GoSellTap;
