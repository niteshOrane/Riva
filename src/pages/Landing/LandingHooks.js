import { useEffect, useState } from 'react';
import { getBanners } from '../../services/layout/Layout.service';

const useLanding = () => {
  const [middleBanner, SetMiddleBanner] = useState([]);

  useEffect(() => {
    getBanners(11)
      .then((response) => response.data)
      .then((banner) => SetMiddleBanner(banner))
      .catch((error) => console.log(error));
  }, []);

  return {
    middleBanner,
  };
};

export default useLanding;
