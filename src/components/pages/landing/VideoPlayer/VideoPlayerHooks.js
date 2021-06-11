import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useVideoPlayer = () => {
    const [video, setVideo] = useState('');

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://65.0.141.49/rest/V1/webapi/getbanners?sliderId=9&storeId=1',
            silent: true
        };

        axios(config)
            .then(response => setVideo(response))
            .catch(error => console.log(error));
    },[]);

    return {
        video
    }
}

export default useVideoPlayer;