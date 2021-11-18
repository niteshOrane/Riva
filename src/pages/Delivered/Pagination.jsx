import React from 'react';
import styles from "./Delivered.module.scss";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.pageLi}>
        {pageNumbers.map(number => (
          <li key={number} >
            <span onClick={() => paginate(number)} className='page-link'>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;