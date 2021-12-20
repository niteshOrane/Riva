import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import MyReviews from "../../components/pages/MyReviews/MyReviews";
import {
  deleteReviewFromList,
  getMyReviewList,
} from "../../services/product/product.service";
import { showSnackbar } from "../../store/actions/common";
import Pagination from "../Delivered/Pagination";

function Reviews() {
  const [myReviewList, setMyReviewList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const dispatch = useDispatch();
  const getMyReview = async () => {
    const res = await getMyReviewList();
    if (res?.status === 200) {
      setMyReviewList(res?.data?.items);
    }
  };
  useEffect(() => {
    getMyReview();
  }, []);
  const deleteReviewAction = async (fnValue) => {
    const res = await deleteReviewFromList(fnValue);
    if (res.status === 200) {
      dispatch(showSnackbar("review deleted successfully", "success"));
      getMyReview();
    }
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myReviewList
    ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    ?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2>My Reviews</h2>
            {myReviewList?.length ? (
              currentPosts?.map((li) => (
                <MyReviews li={li} deleteReviewAction={deleteReviewAction} />
              ))
            ) : (
              <section>No Review Found !!</section>
            )}
            {myReviewList?.length > 3 && (
              <section>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={myReviewList?.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
