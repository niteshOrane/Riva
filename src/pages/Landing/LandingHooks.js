import { useEffect, useState } from 'react';
import { getBanners } from '../../services/layout/Layout.service';

const useLanding = (typeName) => {
  const [middleBanner, SetMiddleBanner] = useState([]);

  useEffect(() => {
    getBanners(typeName)
      .then((response) => response.data)
      .then((banner) => SetMiddleBanner(banner))
  }, []);

  return {
    middleBanner,
  };
};

export default useLanding;
