import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useHeroGrid = () => {
    const [btfLeft, setBtfLeft] = useState([]);
    const [btfRight, setBtfRight] = useState([]);

    const getBanners = (sliderId) => {
        const config = {
            method: 'get',
            url: `http://65.0.141.49/rest/V1/webapi/getbanners?sliderId=${sliderId}&storeId=1`,
            silent: true
        };
        return axios(config)
    }

    useEffect(() => {
        getBanners(7)
            .then(response => setBtfLeft(response.data))
            .catch(error => console.log(error));

        getBanners(8)
            .then(response => setBtfRight(response.data))
            .catch(error => console.log(error));

        // http://65.0.141.49/media/mageplaza/bannerslider/banner/image/
    }, []);

    return {
        btfLeft,
        btfRight
    }
}

export default useHeroGrid;