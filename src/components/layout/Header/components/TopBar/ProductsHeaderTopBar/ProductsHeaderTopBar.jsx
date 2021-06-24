import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../../../../../../store/actions/common';
import style from './ProductsHeaderTopBar.module.scss';
import { selectedCategory } from '../../../../../../store/actions/common';

const ProductsHeaderTopBar = () => {
  const links = useSelector((state) => state.common.category)[0];
  const [defaultCategory, setCategory] = useState('1241'); //woman
  const dispatch = useDispatch();
  const onCategorySelect = (id) => {
    setCategory(id);
    const items = links?.children_data?.filter((e) => e?.id === id) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, id));
    }
  };

  useEffect(() => {
    const items =
      links?.children_data?.filter((e) => e?.id === defaultCategory) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, defaultCategory));
    }
  }, [links, defaultCategory]);

  const currentLocation = useSelector((state) => state.common.currentLocation);
  const store = useSelector((state) => state.common.store);
  const header = useSelector((state) => state.common.header);
  const foundStore =
    header?.find(({ country_id }) => country_id == currentLocation) || {};
  const [phone, setPhone] = useState(foundStore.phone || '+971 800 7482');

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

  return (
    <div
      className={`d-flex align-items-center justify-content-between bg-black ${style.topBarcontainer}`}
    >
      <div className={style.topBarRight}>
        <div className="d-flex align-items-center">
          {links?.children_data?.map(
            (item) =>
              item.is_active == 1 && (
                <div className={style.circleContainer}>
                  <button
                    id={item?.id}
                    onClick={() => {
                      onCategorySelect(item?.id);
                    }}
                    className="bg-transparent no-border"
                  >
                    <span
                      className={`color-white c-pointer ${
                        defaultCategory === item?.id ? 'underline' : ''
                      }`}
                    >
                      {item?.name}
                    </span>
                  </button>
                </div>
              )
          )}
        </div>
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
            {header?.map((head) => {
              const { currency, language } = head;
              return (
                <option
                  style={{ background: '#fff' }}
                  value={JSON.stringify(head)}
                >
                  {`${currency} - ${language}`}
                </option>
              );
            })}
          </select>
          |&nbsp;
        </div>
        العربية
      </div>
    </div>
  );
};

export default ProductsHeaderTopBar;
