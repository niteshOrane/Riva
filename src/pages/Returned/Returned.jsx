import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ReturnCard from "../../components/pages/returned/ReturnCard";
import ReturnForm from "../../components/pages/returned/ReturnForm";
import {
  createRmaRequest,
  getConditionForReturn,
  getReasonForReturn,
  getResolutionForReturn,
} from "../../services/return/return.service";
import { showSnackbar } from "../../store/actions/common";
import { clearReturnList } from "../../store/actions/stats";
import { getCustId, getStoreId } from "../../util";
import { Prompt, useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import AlertModal from "./AlertModal";

function Returned() {
  const { list } = useSelector((state) => state.stats);
  console.log({ list });
  const history = useHistory();
  const [reasonList, setReasonList] = useState(null);
  const [conditionList, setConditionList] = useState(null);
  const [resolutionList, setResolutionList] = useState(null);
  const [userComment, setUserComment] = useState("");
  const [isProm, setIsProm] = useState(true);
  const [proList, setProList] = useState([]);
  const [fieldObj, setFieldObj] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [alertUser, setAlertUser] = useState({
    keys: [],
    name: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (list?.length > 0) {
      const items = list?.map((pro) => {
        setFieldObj((prev) => [
          ...prev,
          { id: pro?.item_id, reason: "", resolution: "", condition: "" },
        ]);
        return {
          order_item_id: pro?.item_id,
          qty_requested: pro?.qty_ordered,
          qty_authorized: null,
          qty_approved: null,
          qty_returned: null,
          reason: ``,
          condition: "",
          resolution: "",
          status: pro?.status,
        };
      });
      setProList(items);
    }
  }, [list]);
  const getAllReasons = async () => {
    const val = await Promise.all([
      getReasonForReturn(),
      getConditionForReturn(),
      getResolutionForReturn(),
    ]);

    if (val.length === 3) {
      setReasonList(val?.[0]?.data);
      setConditionList(val?.[1]?.data);
      setResolutionList(val?.[2]?.data);
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

  const createRmaItems = (e, item, type) => {
    e.persist();
    if (e.target?.value && item && type) {
      setFieldObj((prev) => {
        return prev?.map((li) => {
          if (li?.id === item?.item_id) {
            return { ...li, [type]: e.target?.value };
          }
          return li;
        });
      });
    }
  };

  const checkAllField = () => {
    let isValid = false;
    let emptyItem = {};
    const val = fieldObj?.map((li) => {
      if (Object.values(li).some((a) => a === "")) {
        isValid = true;
        emptyItem = li;
      }
    });
    let emptyKeys = [];
    if (emptyItem) {
      emptyKeys = Object.entries(emptyItem)?.filter(([key, value]) =>
        emptyItem[key] === "" ? key : null
      );
      setAlertUser({
        ...alertUser,
        keys: emptyKeys,
        name: list?.find((li) => li?.item_id === emptyItem?.id)?.name,
      });
    }
    return {
      isValid,
      emptyItem,
      emptyKeys,
    };
  };

  useEffect(() => {
    if (alertUser.keys.length > 0) {
      setOpen(true);
    }
  }, [alertUser]);

  const requestReturn = async (e) => {
    e.preventDefault();
    const { isValid } = checkAllField();
    if (isValid) {
      return;
    }
    const returnedItem = proList?.map((li) => {
      return {
        ...li,
        reason: fieldObj?.find((q) => q?.id === li?.order_item_id)?.reason,
        condition: fieldObj?.find((q) => q?.id === li?.order_item_id)
          ?.condition,
        resolution: fieldObj?.find((q) => q?.id === li?.order_item_id)
          ?.resolution,
      };
    });
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
    if (res?.status === 200 && "success" in res?.data === false) {
      setIsProm(false);
      setTimeout(() => {
        history.push("/returned-orders");
      }, 2000);
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
                      resolutionList={resolutionList && resolutionList}
                      conditionList={conditionList && conditionList}
                      createRmaItems={createRmaItems}
                    />
                  ))}
              </section>
              <ReturnForm
                list={list}
                requestReturn={requestReturn}
                handleCommentChange={handleCommentChange}
              />
              <AlertModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                data={alertUser}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Returned;
