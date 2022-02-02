import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardHeader,
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  colors,
} from "@material-ui/core";
import LoaderButton from "../../../common/Buttons/LoaderButton";

import style from "./AddressCard.module.scss";

const useStyles = makeStyles({
  root: {
    width: "30rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: colors.red[500],
    marginLeft:8
  },
});

function AddressCard({
  addressItem,
  onEdit,
  onDelete,
  isDefault,
  isBillingDefault,
  setDefaultAddress,
  isManageScreen,
  loading
}) {
  const classes = useStyles();
  return addressItem ? (
    <Card
      style={{
        width: isManageScreen ? "27rem" : "30rem",
        boxShadow:
          isDefault || isBillingDefault
            ? "rgba(50, 50, 93, 0.25) 0px 20px 40px -10px inset, rgba(0, 0, 0, 0.3) 0px 10px 30px -15px inset"
            : null,
      }}
    >
      {isDefault || isBillingDefault ? (
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {isDefault ? "D" : "B"}
            </Avatar>
          }
          title={isDefault ? "Delivery Address" : "Billing Address"}
          subheader="Default"
        />
      ) : null}
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {addressItem?.name}
        </Typography>
        <Typography variant="p" component="p">
          {addressItem?.street}
        </Typography>
        <Typography variant="p" component="p">
          {addressItem.state}, {addressItem.postcode}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {addressItem?.phone}
        </Typography>
      </CardContent>
      <CardActions>
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
          </span>
        
        </div>
      </CardActions>
    </Card>
  ) : null;
}

export default AddressCard;
