import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { CardActions, CardContent, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { extractColorSize } from "../../../util";
import styles from "./return.module.scss";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    marginBottom: 10,
  },
  media: {
    height: "20rem",
  },

  select: {
    border: "none",
    borderBottom: "1px solid black",
    outline: "none",
    cursor: "pointer",
  },
}));

export default function ReturnCard({
  product,
  reasonList,
  resolutionList,
  conditionList,
  createRmaItems,
}) {
  const classes = useStyles();

  const getColorSize = (options) => {
    const { colors, size } = extractColorSize(
      options?.map((o) => ({
        label: o.option_id === "92" ? "Color" : "Size",
        values: [{ value_index: o.option_value }],
        attribute_id: o.option_id,
      }))
    );

    return { colors, size };
  };
  const colorSize = getColorSize(
    product?.parent_item?.product_option.extension_attributes
      ?.configurable_item_options
  );

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product?.extension_attributes?.product_thumbnail_image}
      />
      <CardContent>
        <section className={styles.priceWrap}>
          <strong style={{ fontSize: "1.3rem", paddingBottom: "15px" }}>
            {product?.name}
          </strong>
          <br />

          {`${product?.currency} ${product?.parent_item?.price}`}
        </section>
        <div className="mt-12px">
          <div>
            <span>Color: </span>
            <span>{colorSize?.colors?.[0]?.label}</span>
          </div>
          <div>
            <span>Size: </span>
            <span>{colorSize.size?.[0]?.label}</span>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <section
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography>Select Reason:</Typography>
            <form>
              <select
                className={classes.select}
                onChange={(e) => createRmaItems(e, product, "reason")}
                required
                style={{width:"7rem"}}
              >
                <option value="" selected disabled>
                  Select Reason
                </option>
                {reasonList &&
                  Object.entries(reasonList)?.map(([id, reason]) => (
                    <>
                      <option value={id}>{reason}</option>
                    </>
                  ))}
              </select>
            </form>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography>Select Condition:</Typography>
            <form>
              <select
                className={classes.select}
                onChange={(e) => createRmaItems(e, product, "condition")}
                required
                
              >
                <option value="" selected disabled>
                  Select Condition
                </option>
                {conditionList &&
                  Object.entries(conditionList)?.map(([id, reason]) => (
                    <>
                      <option value={id}>{reason}</option>
                    </>
                  ))}
              </select>
            </form>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography>Select Resolution:</Typography>
            <form>
              <select
                className={classes.select}
                onChange={(e) => createRmaItems(e, product, "resolution")}
                required
              >
                <option value="" selected disabled>
                  Select Resolution
                </option>
                {resolutionList &&
                  Object.entries(resolutionList)?.map(([id, reason]) => (
                    <>
                      <option value={id}>{reason}</option>
                    </>
                  ))}
              </select>
            </form>
          </div>
        </section>
      </CardActions>
    </Card>
  );
}
