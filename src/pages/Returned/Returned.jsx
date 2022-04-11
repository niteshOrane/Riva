import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
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
import { Prompt, useHistory } from "react-router-dom";

function Returned() {
  const { list } = useSelector((state) => state.stats);
  const history = useHistory();
  const [reasonList, setReasonList] = useState(null);
  const [returnedItem, setReturnedItem] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [isProm, setIsProm] = useState(true);
  const dispatch = useDispatch();
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
    if (e.target.value) {
      const obj = {
        order_item_id: item?.item_id,
        qty_requested: item?.qty_ordered,
        qty_authorized: null,
        qty_approved: null,
        qty_returned: null,
        reason: `${e.target.value}`,
        condition: "4158",
        resolution: "4160",
        status: item?.status,
      };
      setReturnedItem((prev) => [...prev, obj]);
    }
  };

  const requestReturn = async (e) => {
    e.preventDefault();
    if (returnedItem?.length !== list?.length) {
      return dispatch(
        showSnackbar("Select a return reason on all items", "error")
      );
    }
    const rmaData = {
      rmaDataObject: {
        order_id: list?.[0]?.order_id,
        order_increment_id: list?.[0]?.increment_id,
        store_id: Number(getStoreId()),
        customer_id: Number(getCustId()),
        date_requested: new Date(),
        customer_custom_email: null,
        items: returnedItem,
        status: list?.[0]?.status,
        comments: [userComment],
        tracks: [],
      },
    };
    const res = await createRmaRequest(rmaData);
    console.log({ res });
    if (res?.status === 200 && !res?.data?.hasOwn("success")) {
      setIsProm(false);
      // setTimeout(() => {
      //   history.push("/returned-orders");
      // }, 2000);
      return dispatch(
        showSnackbar(
          "Return request created, redirecting to returns",
          "success"
        )
      );
    }
    return dispatch(
      showSnackbar("something went wrong,Item is not returnable", "error")
    );
  };
  return (
    <>
      {isProm && (
        <Prompt message="Are you sure you want to leave? If you have any pending return request it will be discarded" />
      )}
      <div className="d-flex py-20px">
        <div className="container-with-circles">
          <div className="d-flex h-100">
            <Sidebar />
            <div className="w-100">
              {list.length === 0 && (
                <Alert severity="info">
                  <AlertTitle>No Product to return</AlertTitle>
                  There is no product to return, Go to your orders and request a
                  return.
                </Alert>
              )}
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
                list={list}
                requestReturn={requestReturn}
                handleCommentChange={handleCommentChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Returned;
