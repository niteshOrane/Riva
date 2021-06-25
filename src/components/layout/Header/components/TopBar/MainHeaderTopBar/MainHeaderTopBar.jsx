import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../../../../../../store/actions/common';
import style from './MainHeaderTopBar.module.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

import storeData from '../../../../../../store/index';
import { useEffect } from 'react';
const MainHeaderTopBar = ({mainHeader}) => {
  debugger
  const currentLocation = useSelector((state) => state.common.currentLocation);
  const store = useSelector((state) => state.common.store);
  const header = useSelector((state) => state.common.header);
  const foundStore = header?.find(({ country_id }) => country_id === currentLocation) || {};
  const [phone, setPhone] = useState(foundStore.phone || '+971 800 7482');
  const [languageItem, setLanguageItem] = useState(' العربية');
  const [storeDropDown, setStoreDropDown] = useState([]);
  const dispatch = useDispatch();
  console.log('header', header)
  if (!store) dispatch(setStore(foundStore));

  const handleCurrencyChange = (event, head) => {
    setPhone(head.phone || '+971 800 7482');
    setLanguageItem(head.language)
    dispatch(setStore(head));
  };
  useEffect(() => {
    const data = storeData?.getState()?.common.store;
    setLanguageItem(data.language);
    setPhone(data.phone || '+971 800 7482');
    if (!store) dispatch(setStore(foundStore));
    setStoreDropDown(header.filter(e => e.language !== data.language));
  }, [header])
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
            <img  className={style.curSelectedImage} src={`${mainHeader?'':'/'}assets/images/countryIcons/${store?.currency}.png`} alt={store?.currency} />
          </div>
          <Dropdown className="dropdown-main">
          <Dropdown.Toggle variant="light" className={`${style.select} w-100 btn-xl`} 
           id="dropdown-basic"><div  className={style.curSelected}>{store?.currency}</div></Dropdown.Toggle>
          <Dropdown.Menu>
              {storeDropDown?.map((head) => {
              const { currency } = head;
              return (
                <Dropdown.Item onClick={(e)=>{handleCurrencyChange(e, head)}}
               as="button"> <img width="24" className={style.curImage} src={`${mainHeader?'':'/'}assets/images/countryIcons/${currency}.png`}
                 height="24" alt={currency}/><div  className={style.curName} >{currency}</div></Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
          |&nbsp;
          <span>{languageItem}</span>
        </div>
      </div>
    </div>
  );
};

export default MainHeaderTopBar;
