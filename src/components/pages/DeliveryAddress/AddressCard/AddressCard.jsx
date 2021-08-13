import React from "react";
import style from "./AddressCard.module.scss";

function AddressCard({
  addressItem,
  onEdit,
  onDelete,
  isDefault,
}) {
  console.log(isDefault);
  return (
    <div className={style.card}>
      {isDefault?.id === addressItem?.id && (
        <div className={style.cardHeader}>
          <h3 className="card-title">Default: RIVA</h3>
          <hr />
        </div>
      )}
      <div className={style.cardBody}>
        <section>
          <span className={style.name}>{addressItem?.name}</span>
          <p>{addressItem?.street}</p>
          <p>
            {addressItem.state}, {addressItem.postcode}
          </p>
          <p>{addressItem?.phone}</p>
          <div className={style.action}>
            <span
              onClick={() => {
                onEdit(addressItem);
              }}
              className={style.edit}
            >
              Edit
            </span>{" "}
            |{" "}
            <span
              onClick={() => {
                onDelete(addressItem);
              }}
              className={style.delete}
            >
              Remove
            </span>{" "}
            |{" "}
            <span
              className={style.delete}
            >
              Set as default
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddressCard;
