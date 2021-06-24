import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Circle from '../../components/layout/Navbar/Circle';
import { selectedCategory } from "../../store/actions/common";
import Sidebar from '../../components/pages/Wishlist/Sidebar/Sidebar';
import Card from '../../components/pages/Wishlist/Card/Card';
import styles from './Wishlist.module.scss';

const randomData = [
  {
    src: "https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/68662e4e-fd71-41c3-8642-1fc2024c1953.png",
    name: "Printed Open Skirt",
    priceWas: "108.57",
    priceIs: "75.90",
  },
  {
    src: "https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/a128c5cb-abc6-4387-85ff-e09be1633e24.png",
    name: "Printed Open Skirt",
    priceWas: "108.57",
    priceIs: "75.90",
  },
  {
    src: "https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/db42f44b-012b-4674-91ef-0384cc85650a.png",
    name: "Printed Open Skirt",
    priceWas: "108.57",
    priceIs: "75.90",
  }
]



function WishList() {
    const links = useSelector((state) => state.common.category)[0];
    const [defaultCategory, setCategory] = useState("1241"); //woman
    const dispatch = useDispatch();
    const onCategorySelect = (id) => {
      setCategory(id);
      const items = links?.children_data?.filter((e) => e?.id === id) ?? [];
      if (items.length) {
        dispatch(selectedCategory(items[0]?.children_data, id));
      }
    };
   
  
    useEffect(() => {
      const items =
        links?.children_data?.filter((e) => e?.id === defaultCategory) ?? [];
      if (items.length) {
        dispatch(selectedCategory(items[0]?.children_data, defaultCategory));
      }
    }, [links, defaultCategory]);
    return (
        <div className="d-flex my-20px">
        <div  className={styles.circlesContainer}>
         {links?.children_data?.map(
          (item) =>
            item.is_active == 1 && (
              
                <Circle
                  id={item?.id}
                  onClick={() => {
                    onCategorySelect(item?.id);
                  }}
                  bg={`${defaultCategory === item?.id ? "skin" : "black"}`}
                >
                  {item?.name}
                </Circle> 
               
            )
        )}   
        </div>
        <div className="container-90 max-width-1600 mx-auto">
          <div className="d-flex h-100">
            <Sidebar />
            <div className={styles.cardsContainer}>
            <h2 className={styles.title}>My Wishlist</h2>
           
            <div className="d-flex gap-12 f1 justify-content-around">
              {
                randomData?.map(product => (
                  <Card name={product?.name} src={product?.src} priceWas={product?.priceWas} priceIs={product?.priceIs}/>
                ))
              }
            </div>
            </div>
          </div>
        </div>
        </div>
    )
}

export default WishList
