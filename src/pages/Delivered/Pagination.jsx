import React from "react";
import styles from "./Delivered.module.scss";

const Pagination = ({ postsPerPage, totalPosts, paginate,currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.pageLi}>
        {pageNumbers.map((number) => (
          <li
          
            style={{
              boxShadow:
                number === currentPage
                  ? "inset 0px 0px 60px -28px rgba(0, 0, 0, 0.5)"
                  : null,
            }}
            key={number}
            onClick={() => paginate(number)}
          >
            <span  className="page-link">
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
