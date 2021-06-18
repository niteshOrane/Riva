import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../../../store/actions/common';
import style from './topBar.module.scss';
const defaultNumber = '+971 800 7482';
const defaultLanguage = 'English';
const TopBar = () => {
  const currentLocation = useSelector(state => state.common.currentLocation);

  const currencyList = useSelector(state => state.common.currency);
  const header = useSelector(state => state.common.header);
  let foundStore = header?.find(({ country_id }) => country_id == currentLocation?.country) || {};
  const [phone, setPhone] = useState(foundStore.phone || defaultNumber);
  const [languageSelected, setLanguageSelected] = useState(foundStore.language || defaultLanguage);
  const dispatch = useDispatch();

  const handleCurrencyChange = (event) => {
    foundStore = header.find(({ store_id }) => store_id === event.target.value) || {};
    setPhone(foundStore.phone || defaultNumber);
    setLanguageSelected(foundStore.language || defaultLanguage);
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
            {header?.map(({ store_name, language, store_id }) => <option value={store_id}>{`${store_name} - ${language}`}</option>)}
          </select>
          |{languageSelected}
        </div>

      </div>
    </div>
  );
};

export default TopBar;
