import { useEffect, useState } from "react";
import { getBanners } from "../../services/layout/Layout.service";

const useLanding = (typeName) => {
  const [middleBanner, SetMiddleBanner] = useState([]);

  useEffect(() => {
    getBanners(typeName)
      .then((response) => {
        console.log(response,"banner")
        response.data;
      })
      .then((banner) => SetMiddleBanner(banner));
  }, []);

  return {
    middleBanner,
  };
};

export default useLanding;
