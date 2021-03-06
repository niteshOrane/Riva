import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStore } from "../../../../../../store/actions/common";
import style from "./MainHeaderTopBar.module.scss";
import storeData from "../../../../../../store/index";
import useArabic from "../../../../../common/arabicDict/useArabic";
import CategoriesCircles from "../../../../../common/CategoriesCircles/CategoriesCircles";

const MainHeaderTopBar = ({ mainHeader }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { translate } = useArabic();
  const [showLanguageShowDropdown, setLanguageShowDropdown] = useState(false);
  const currentLocation = useSelector((state) => state.common.currentLocation);
  const store = useSelector((state) => state.common.store);
  const header = useSelector((state) => state?.common?.header);
  const foundStore =
    header?.find(({ country_id }) => country_id === currentLocation) || {};
  const [languageItem, setLanguageItem] = useState("العربية");
  const [storeDropDown, setStoreDropDown] = useState([]);
  const dispatch = useDispatch();
  if (!store) dispatch(setStore(foundStore));

  const handleCurrencyChange = (event, head) => {
    let lanTochange = "";
    head.language === "Arabic"
      ? (lanTochange = "العربية")
      : (lanTochange = head?.language);
    setLanguageItem(lanTochange);
    dispatch(setStore(head));
  };

  const handleLanguageChange = (event, languageChange) => {
    let lanTochange = "";
    languageChange === "Arabic"
      ? (lanTochange = "العربية")
      : (lanTochange = languageChange);
    setLanguageItem(lanTochange);
    setStoreDropDown(header.filter((e) => e.language === languageChange));
    const foundStoreByChnageLang =
      header?.find(
        ({ language, country_id }) =>
          language === languageChange && country_id === store.country_id
      ) || {};

    dispatch(
      setStore({
        ...foundStoreByChnageLang,
        languageChange,
      })
    );
  };

  useEffect(() => {
    let lanTochange = "";
    const data = storeData?.getState()?.common.store;
    data.language === "Arabic"
      ? (lanTochange = "العربية")
      : (lanTochange = data?.language);
    setLanguageItem(lanTochange);
    if (!store) dispatch(setStore(foundStore));
    setStoreDropDown(header.filter((e) => e.language === data.language));
  }, [header]);

  return (
    <div className="bg-black">
      <div
        className={`d-flex align-items-center justify-content-between max-width-1750 mx-auto ${style.topBarcontainer}`}
      >
        {/* <span className="font-size-normal material-icons-outlined font-white">
            phone
          </span>
          <p>
            <a
              className="font-white white-space-nowrap"
              href="tel:+971 800 7482"
            >
              &nbsp;{phone}
            </a>
          </p> */}
        <CategoriesCircles />

        <div className={style.topBarMsgWrapper}>
          <h4 className={`${style.topBarMsg} white-space-nowrap font-white`}>
            {translate?.home?.NEW}:{" "}
            <span className="color-text-primary">
              {translate?.home?.SPRING}
            </span>{" "}
            {translate?.home?.COL}
          </h4>
        </div>
        <div
          className={`${style.topBarLeft} font-black h-100 d-flex align-items-center`}
        >
          <div className="d-flex-all-center c-pointer">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="position-relative d-flex align-items-center justify-content-center"
              style={{ width: "100px" }}
            >
              <div className={`${style.flag} d-flex`}>
                <img
                  className={style.curSelectedImage}
                  src={`${mainHeader ? "" : "/"}assets/images/countryIcons/${
                    store?.currency
                  }.png`}
                  alt={store?.currency}
                />
              </div>
              <div className={style.curSelected}>{store?.currency}</div>
              <div
                className={`${style.dropdownBody} ${
                  showDropdown ? style.showDD : ""
                }`}
              >
                <div className={style.currencyDropdown}>
                  {storeDropDown
                    ?.filter((li) => li?.currency !== "OMR")
                    ?.map((head) => {
                      const { currency } = head;
                      return (
                        <div
                          className={
                            store.language === "Arabic"
                              ? style.dropdownItemRight
                              : style.dropdownItem
                          }
                          onClick={(e) => {
                            handleCurrencyChange(e, head);
                          }}
                        >
                          <img
                            width="24"
                            className={style.curImage}
                            src={`${
                              mainHeader ? "" : "/"
                            }assets/images/countryIcons/${currency}.png`}
                            height="24"
                            alt={currency}
                          />
                          <div className={style.curName}>{currency}</div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div
                className={
                  store.language === "Arabic"
                    ? style.angleIconRight
                    : style.angleIcon
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.591"
                  height="6.049"
                  viewBox="0 0 11.591 6.049"
                >
                  <g>
                    <path
                      fill="#f44336"
                      d="M117.759.2a.252.252 0 0 0-.356.356l5.364 5.364-5.367 5.368a.252.252 0 1 0 .35.362l.006-.006L123.3 6.1a.252.252 0 0 0 0-.356z"
                      transform="translate(11.591 -117.325) rotate(90) translate(0 -0.131)"
                    />
                    <path
                      d="M117.7 11.588a.252.252 0 0 1-.178-.43l5.364-5.364L117.521.43a.252.252 0 0 1 .357-.357l5.542 5.542a.252.252 0 0 1 0 .356l-5.542 5.542a.252.252 0 0 1-.178.075z"
                      transform="translate(11.591 -117.325) rotate(90) translate(-0.119 0)"
                    />
                  </g>
                </svg>
              </div>
            </div>
            |&nbsp;&nbsp;
            <div
              onClick={() => setLanguageShowDropdown(!showLanguageShowDropdown)}
              className="position-relative d-flex align-items-center"
              style={{ width: "100px" }}
            >
              <div className={`${style.flag} d-flex`} />
              <div
                className={style.curSelected}
                onClick={(e) => {
                  handleLanguageChange(
                    e,
                    languageItem === "English" ? "Arabic" : "English"
                  );
                }}
              >
                {languageItem === "English" ? "العربية" : "English"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeaderTopBar;
