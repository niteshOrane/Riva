import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../../../store/actions/common';
import style from './topBar.module.scss';
const TopBar = () => {
  const currentLocation = useSelector(state => state.common.currentLocation);
  const currencyList = useSelector(state => state.common.currency);
  const header = useSelector(state => state.common.header);
  const foundStore = header?.find(({country_id}) => country_id == currentLocation) || {};
  const [phone, setPhone] = useState(foundStore.phone || '+971 800 7482');
  const dispatch = useDispatch();

  const handleCurrencyChange = (event) => {
    const foundStore = header.find(({currency}) => currency == event.target.value) || {};
    setPhone(foundStore.phone || '+971 800 7482');
    dispatch(setCurrency(event.target.value));
  }

  return (
    <div className={`d-flex align-items-center justify-content-between bg-black ${style.topBarcontainer}`}>
      <div className={style.topBarRight}>
        <span className="font-size-normal material-icons-outlined font-white">
          phone
        </span>
        <p>
          <a className="font-white" href="tel:+971 800 7482">
            &nbsp;{phone}
          </a>
        </p>
      </div>
      <div>
        <h4 className={`${style.topBarMsg} font-white`}>
          NEW IN:{' '}
          <span className="color-text-primary">SPRING-SUMMER 2021</span>{' '}
          COLLECTION
        </h4>
      </div>
      <div className={`${style.topBarLeft} font-black h-100 d-flex align-items-center`}>
        <div className="d-flex-all-center c-pointer">
          <div className={`${style.flag} d-flex`}>
            <img src="/assets/images/flag.png" alt="" />
          </div>
          <select className={style.select} value={currencyList} onChange={handleCurrencyChange}>
            {header?.map(({currency, language}) => <option value={currency}>{`${currency} - ${language}`}</option>)}
          </select>
            |&nbsp;
          </div>
          العربية
        </div>
    </div>
  );
};

export default TopBar;
