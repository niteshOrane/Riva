import React from "react";
import styles from "./return.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import API_URL from "../../../util/index";
import { getStoreData } from "../../../util/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  wrap: {
    display: "flex",
    flexDirection: "column",
  },
}));

// const getReason = async (id) => {
//   const res = await `${API_URL}/rest/${
//     getStoreData()?.store_code
//   }/V1/riva-rma/rmareasonlist?reasonId=${id}`;
// };
function ListCard({ product, id, status }) {
  const classes = useStyles();
  return (
    <div className={styles.listCardWrap}>
      <section className={styles.orderId}>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6hc8o2hE5Mt1PY9f7LS9aFSr8_DbBKcj-5Q&usqp=CAU"
              />
            </ListItemAvatar>
            <ListItemText
              primary={id}
              secondary={
                <div className={classes.wrap}>
                  <section>
                    <span>Status:</span>{" "}
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {status}
                    </Typography>
                  </section>
                  <section>
                    <span>Quantity:</span>{" "}
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {product?.qty_requested}
                    </Typography>
                  </section>
                </div>
              }
            />
          </ListItem>
          <Divider />
        </List>
      </section>
    </div>
  );
}

export default ListCard;
