import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import style from "./AddressCard.module.scss";

const useStyles = makeStyles({
  root: {
    width:"20rem"
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
});

function AddressCard({ addressItem, onEdit, onDelete, isDefault }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
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
          </span>{" "}
          | <span className={style.delete}>Set as default</span>
        </div>
      </CardActions>
    </Card>
  );
}

export default AddressCard;
