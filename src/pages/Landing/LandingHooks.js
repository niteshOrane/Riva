import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useLanding = () => {
    const [middleBanner, SetMiddleBanner] = useState([]);

    const getBanners = (sliderId) => {
        const config = {
            method: 'get',
            url: `http://65.0.141.49/rest/V1/webapi/getbanners?sliderId=${sliderId}&storeId=1`,
            silent: true
        };
        return axios(config)
    }

    useEffect(() => {
        getBanners(11)
            .then(response => response.data[0].image)
            .then(banner => SetMiddleBanner(`http://65.0.141.49/media/mageplaza/bannerslider/banner/image/${banner}`))
            .catch(error => console.log(error));
    }, []);

    return {
        middleBanner
    }
}

export default useLanding;