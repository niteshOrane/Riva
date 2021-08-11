import { useEffect, useState } from 'react';
import { getBanners } from '../../../../services/layout/Layout.service';

const useHeroGrid = () => {
  const [btfLeft, setBtfLeft] = useState([]);
  const [allrecord, setAllrecord] = useState([]);
  const [btfRight, setBtfRight] = useState([]);
  const [videoBanner, setVideoBanner] = useState([]);

  useEffect(() => {
    getBanners('main')
      .then((response) => setAllrecord(response.data))
      .catch((error) => console.log(error));
    getBanners('lookbook')
      .then((response) => setVideoBanner(response.data))
      .catch((error) => console.log(error));
    // http://65.0.141.49/media/mageplaza/bannerslider/banner/image/
  }, []);

  useEffect(() => {
    setBtfLeft(allrecord.filter(e => e.position === '1'))
    setBtfRight(allrecord.filter(e => e.position !== '1'))
  }, [allrecord]);
  return {
    btfLeft,
    btfRight,
    videoBanner,
  };
};

export default useHeroGrid;
