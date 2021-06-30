import { useEffect, useState } from 'react';
import axios from 'axios';
import { getStoreId } from '../../../../util';
import API_URL from '../../../../enviroments';

const useVideoPlayer = () => {
  const [video, setVideo] = useState('');

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${API_URL}/webapi/getbanners?sliderId=9&storeId=${getStoreId()}`,
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
