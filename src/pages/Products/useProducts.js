import { useEffect, useState } from 'react';
import axios from 'axios';

const useProducts = ({categoryId}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const config = {
            method: 'get',
            url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/categoryproducts?categoryId=${categoryId}&storeId=24&start=0&limit=12`,
            silent: true
        };

        axios(config)
            .then(response => {
                const products = response.data.map(product => {
                    return {
                        id: product.id,
                        src: product.image,
                        name: product.name,
                        wasPrice: product.price,
                        nowPrice: product.price,
                    }
                });
                setProducts(products)
            })
            .catch(error => console.log(error))
    }, [categoryId])

    return {
        products
    }
}

export default useProducts;