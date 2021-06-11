import { useEffect, useState } from 'react';
import axios from 'axios';

const useCMSContent = ({identifier}) => {
    const [content, setContent] = useState('');
    useEffect(() => {
        const config = {
            method: 'get',
            url: `http://65.0.141.49/rest/V1/webapi/getcmspage?storeId=24&cmsIdentifier=${identifier}`,
            silent: true
        };
        axios(config)
            .then(response => setContent(response.data.content || ""))
            .catch(error => console.log(error));
    },[]);
    return {
        content
    }
}

export default useCMSContent;