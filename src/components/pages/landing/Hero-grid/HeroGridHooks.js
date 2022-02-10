import { useEffect, useState } from "react";
import { getBanners } from "../../../../services/layout/Layout.service";

const useHeroGrid = () => {
  const [btfLeft, setBtfLeft] = useState([]);
  const [allrecord, setAllrecord] = useState([]);
  const [btfRight, setBtfRight] = useState([]);
  const [videoBanner, setVideoBanner] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBanners("main")
      .then((response) => {
        setAllrecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    getBanners("lookbook")
      .then((response) => {
        setVideoBanner(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, []);

  useEffect(() => {
    setBtfLeft(allrecord.filter((e) => e.position === "1"));
    setBtfRight(allrecord.filter((e) => e.position !== "1"));
  }, [allrecord]);
  return {
    btfLeft,
    btfRight,
    videoBanner,
    loading
  };
};

export default useHeroGrid;
