import { useEffect, useState } from 'react';
import { getBanners } from '../../../../services/layout/Layout.service';

const useHeroGrid = () => {
  const [btfLeft, setBtfLeft] = useState([]);
  const [btfRight, setBtfRight] = useState([]);

  useEffect(() => {
    getBanners(7)
      .then((response) => setBtfLeft(response.data))
      .catch((error) => console.log(error));

    getBanners(8)
      .then((response) => setBtfRight(response.data))
      .catch((error) => console.log(error));

    // http://65.0.141.49/media/mageplaza/bannerslider/banner/image/
  }, []);

  return {
    btfLeft,
    btfRight,
  };
};

export default useHeroGrid;
