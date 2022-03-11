import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ReturnCard from "../../components/pages/returned/ReturnCard";
import ReturnForm from "../../components/pages/returned/ReturnForm";
import { clearReturnList } from "../../store/actions/stats";
import styles from "./returnMain.module.scss";

function Returned() {
  const { list } = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  console.log({list})
  useEffect(() => {
    return () => {
      dispatch(clearReturnList());
    };
  }, []);
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <section className={styles.cardWrap}>
              {list?.length > 0 &&
                list?.map((card) => <ReturnCard product={card} />)}
            </section>
            <ReturnForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returned;
