import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../../../../../../store/actions/common';
import style from './MainHeaderTopBar.module.scss';

import storeData from '../../../../../../store/index';
import { useEffect } from 'react';
const MainHeaderTopBar = () => {
  const currentLocation = useSelector((state) => state.common.currentLocation);
  const store = useSelector((state) => state.common.store);
  const header = useSelector((state) => state.common.header);
  const foundStore =
    header?.find(({ country_id }) => country_id == currentLocation) || {};
  const [phone, setPhone] = useState(foundStore.phone || '+971 800 7482');
  const [languageItem, setLanguageItem] = useState(' العربية');
  const [storeDropDown, setStoreDropDown] = useState([]);
  const dispatch = useDispatch();

  if (!store) dispatch(setStore(foundStore));

  const handleCurrencyChange = (event) => {
    const foundStore =
      header.find(({ currency }) => currency == event.target.value) || {};
    setPhone(foundStore.phone || '+971 800 7482');
    dispatch(
      setStore(
        typeof event.target.value === 'string'
          ? JSON.parse(event.target.value)
          : event.target.value
      )
    );
  };
  useEffect(() => {
    let data = storeData?.getState()?.common.store;
    setLanguageItem(data.language)
    setStoreDropDown(header.filter(e => e.language !== data.language))
    setPhone(data.phone || '+971 800 7482');
  }, [])
  return (
    <div
      className={`d-flex align-items-center justify-content-between bg-black ${style.topBarcontainer}`}
    >
      <div className={style.topBarRight}>
        <span className="font-size-normal material-icons-outlined font-white">
          phone
        </span>
        <p>
          <a className="font-white white-space-nowrap" href="tel:+971 800 7482">
            &nbsp;{phone}
          </a>
        </p>
      </div>
      <div className={style.topBarMsgWrapper}>
        <h4 className={`${style.topBarMsg} white-space-nowrap font-white`}>
          NEW IN: <span className="color-text-primary">SPRING-SUMMER 2021</span>{' '}
          COLLECTION
        </h4>
      </div>
      <div
        className={`${style.topBarLeft} font-black h-100 d-flex align-items-center`}
      >
        <div className="d-flex-all-center c-pointer">
          <div className={`${style.flag} d-flex`}>
            <img src="/assets/images/flag.png" alt="" />
          </div>
          <select
            className={style.select}
            value={JSON.stringify(store)}
            onChange={handleCurrencyChange}
          >
            {storeDropDown?.map((head) => {
              const { currency, language, store_name } = head;
              return (
                <option
                  style={{ background: '#fff' }}
                  value={JSON.stringify(head)}
                >{`${store_name} - ${currency}`}</option>
              );
            })}
          </select>
          |&nbsp;
          <span>{languageItem}</span>
        </div>
      </div>
    </div>
  );
};

export default MainHeaderTopBar;
