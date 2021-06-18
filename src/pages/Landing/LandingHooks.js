import { useEffect, useState } from 'react';
import { getBanners } from '../../services/layout/Layout.service';

const useLanding = () => {
  const [middleBanner, SetMiddleBanner] = useState([]);

  useEffect(() => {
    getBanners(11)
      .then((response) => response.data[0].image)
      .then((banner) =>
        SetMiddleBanner(
          `http://65.0.141.49/media/mageplaza/bannerslider/banner/image/${banner}`
        )
      )
      .catch((error) => console.log(error));
  }, []);

  return {
    middleBanner,
  };
};

export default useLanding;
