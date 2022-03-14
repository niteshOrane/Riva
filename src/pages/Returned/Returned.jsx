import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ReturnCard from "../../components/pages/returned/ReturnCard";
import ReturnForm from "../../components/pages/returned/ReturnForm";
import {
  createRmaRequest,
  getReasonForReturn,
} from "../../services/return/return.service";
import { showSnackbar } from "../../store/actions/common";
import { clearReturnList } from "../../store/actions/stats";
import { getCustId, getStoreId } from "../../util";

function Returned() {
  const { list } = useSelector((state) => state.stats);
  const [reasonList, setReasonList] = useState(null);
  const [returnedItem, setReturnedItem] = useState([]);
  const [userComment, setUserComment] = useState("");
  const dispatch = useDispatch();
  console.log({ list });
  const getAllReasons = async () => {
    const res = await getReasonForReturn();
    if (res?.status === 200) {
      setReasonList(res?.data);
    }
  };
  useEffect(() => {
    getAllReasons();
    return () => {
      dispatch(clearReturnList());
    };
  }, []);

  const handleCommentChange = (e) => {
    setUserComment(e.target.value);
  };

  const createRmaItems = (e, item) => {
    const obj = {
      order_item_id: item?.item_id,
      qty_requested: item?.qty_ordered,
      qty_authorized: null,
      qty_approved: null,
      qty_returned: null,
      reason: `${e.target.value}`,
      condition: `${e.target.value}`,
      resolution: `${e.target.value}`,
      status: item?.status,
    };
    setReturnedItem((prev) => [...prev, obj]);
  };

  const requestReturn = async (e) => {
    e.preventDefault();
    if (returnedItem?.length !== list?.length) {
      return dispatch(showSnackbar("Select a return reason on items", "error"));
    }
    const rmaData = {
      rmaDataObject: {
        order_id: list?.[0]?.order_id,
        order_increment_id: list?.[0]?.increment_id,
        store_id: getStoreId(),
        customer_id: getCustId(),
        date_requested: new Date(),
        customer_custom_email: null,
        items: returnedItem,
        status: list?.[0]?.status,
        comments: [userComment],
        tracks: [],
      },
    };
    const res = await createRmaRequest(rmaData);
    if (res?.status === 200) {
      return dispatch(showSnackbar("Return request created", "success"));
    }
    return dispatch(showSnackbar("something went wrong", "error"));
  };
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginBottom: "1rem",
              }}
            >
              {list?.length > 0 &&
                list?.map((card) => (
                  <ReturnCard
                    product={card}
                    reasonList={reasonList && reasonList}
                    createRmaItems={createRmaItems}
                  />
                ))}
            </section>
            <ReturnForm
              requestReturn={requestReturn}
              handleCommentChange={handleCommentChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returned;
