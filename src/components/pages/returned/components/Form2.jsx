import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCustomerAddress } from "../../../../services/address/address.service";
import { getCustId } from "../../../../util";
import styles from "../return.module.scss";

function Form2() {
  const [address, setAddress] = useState(null);
  const [list, setList] = useState(null);
  const getAddress = async () => {
    const id = getCustId();
    const res = await getCustomerAddress(id);
    if (res?.status === 200) {
      setList(res?.data?.data);
      let response = res?.data?.data;
      response = response?.find(
        (li) => li?.Shippingid === res?.data?.dataind?.Shippingid
      );
      setAddress(response);
    }
  };
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <div className={styles.wrap}>
      <header>
        <span>2</span>
        <p>PICKUP ADDRESS</p>
      </header>
      <section>
        {address && (
          <div className={styles.addBlk}>
            {address?.name}<br/>
            {address?.street}{" "},{address?.street1}<br />
            {address?.house_name_number}{" "},{address?.building_name_number}<br />
            {address?.city},{" "}{address.state},{" "}{address.country},{" "}{address?.postcode}
          </div>
        )}
        </section>
    </div>
  );
}

export default Form2;
