import { useEffect, useState } from 'react';
import { getStoreId } from '../../../../util';
import axios from 'axios';

const useVideoPlayer = () => {
  const [video, setVideo] = useState('');

  useEffect(() => {
    const config = {
      method: 'get',
      url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/getbanners?sliderId=9&storeId=${getStoreId()}`,
      silent: true,
    };

    axios(config)
      .then((response) => setVideo(response))
      .catch((error) => console.log(error));
  }, []);

  return {
    video,
  };
};

export default useVideoPlayer;
