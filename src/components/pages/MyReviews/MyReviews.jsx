import React from "react";
import styles from "./myReview.module.scss";

const dummyReviews = [
  {
    name: "Western style top",
    image:
      "http://65.0.141.49/shop/media/catalog/product/cache/60beb09e5cd7beda45c9be9bfccb6a94/a/z/az1i8911.jpg",
    rating: 4,
    reviews: "This Product is good",
  },
  {
    name: "Top waist hijab",
    image:
      "http://65.0.141.49/shop/media/catalog/product/cache/60beb09e5cd7beda45c9be9bfccb6a94/a/a/aaz1i9267.jpg",
    rating: 5,
    reviews: "This Product is good",
  },
  {
    name: "High waist slim fit trouser",
    image:
      "http://65.0.141.49/shop/media/catalog/product/cache/60beb09e5cd7beda45c9be9bfccb6a94/a/z/az1i8608.jpg",
    rating: 4,
    reviews: "This Product is good",
  },
];

function MyReviews() {
  return (
    <div>
      <h2>My Reviews</h2>
      <section>
        {dummyReviews?.map((li) => (
          <section>
            <div className={styles.box}>
              <div>
                <img src={li?.image} alt={li?.name} />
              </div>
              <div className={styles.content}>
                <p>{li.name}</p>
                <div className={styles.starBox}>
                  <span className="material-icons">star_rate</span>
                  <span>{li?.rating}</span>
                </div>
                <span className={styles.reviews}>{li.reviews}</span>
                <div className={styles.links}>
                  <a href="#">Edit</a>
                  <a href="#">Delete</a>
                </div>
                <div className={styles.act}>
                  <span className="material-icons-outlined">thumb_up_alt</span>
                  <span className="material-icons-outlined">thumb_down</span>
                </div>
              </div>
            </div>
            <hr style={{marginTop:"20px"}}/>
          </section>
        ))}
      </section>
    </div>
  );
}

export default MyReviews;
