import { useEffect, useState } from 'react';
import axios from 'axios';
import { getStoreId, getLanguageName } from '../../../../util';
import API_URL from '../../../../enviroments';

const useVideoPlayer = () => {
  const [video, setVideo] = useState('');

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${API_URL}/webapi/getbanners?type=lookbook&storeId=${getStoreId()}&language=${getLanguageName()}`,
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
