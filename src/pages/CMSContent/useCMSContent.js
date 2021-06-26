import { useEffect, useState } from 'react';
import axios from 'axios';
import { getStoreId } from '../../util';

const useCMSContent = ({ identifier }) => {
  const [content, setContent] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
    const config = {
      method: 'get',
      url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/getcmspage?storeId=${getStoreId()}&cmsIdentifier=${identifier}`,
      silent: true,
    };
    axios(config)
      .then((response) => setContent(response.data.content || ''))
      .catch((error) => console.log(error));
  }, [identifier]);
  return {
    content,
  };
};

export default useCMSContent;
