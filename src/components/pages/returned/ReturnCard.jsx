import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { extractColorSize } from "../../../util";
import { CardActions, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: "20rem",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  select: {
    border: "none",
    borderBottom: "1px solid black",
  },
}));

export default function ReturnCard({ product, reasonList, createRmaItems }) {
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
        <section>
          <strong style={{ fontSize: "1.3rem", paddingBottom: "15px" }}>
            {product?.name}
          </strong>
          <br />
          {`${product?.currency}${product?.parent_item?.price}`}
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
        <Typography>Select a reason of return:</Typography>
        <form>
          <select
            className={classes.select}
            onChange={(e) => createRmaItems(e, product)}
            required
          >
            {reasonList &&
              Object.entries(reasonList)?.map(([id, reason]) => (
                <>
                  <option value={id}>{reason}</option>
                </>
              ))}
          </select>
        </form>
      </CardActions>
    </Card>
  );
}
