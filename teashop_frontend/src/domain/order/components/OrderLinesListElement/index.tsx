import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../../configuration/routing";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import { Product } from "../../../product/models";
import { pricedByWeight } from "../../../product/services/productService";
import { OrderLine } from "../../models";
import { calculateOrderLinePrice } from "../../services/orderService";
import useStyles from "./styles";

interface Props {
    orderLine: OrderLine;
}

const getOrderLineQuantityText = (line: OrderLine) =>
    (pricedByWeight(line.product) ? `${line.quantity}g` : line.quantity);

const getLinkToProductDetailsPageWith = (product: Product) =>
    routing.productDetails.getPathWithParams({
        productNumber: product.productNumber.toString(),
    });

const OrderLinesListElement = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid
            item
            xs={12}
            container
            spacing={2}
            alignItems="center"
            className={classes.itemContainer}
        >
            <Grid item>
                <Paper
                    square
                    variant="outlined"
                    className={classes.imageContainer}
                >
                    <img
                        src={getImageFullUrl(props.orderLine.product.imagePath)}
                        alt="product"
                        className={classes.image}
                    />
                </Paper>
            </Grid>
            <Grid item container spacing={2} className={classes.grow}>
                <Grid item sm={8} xs={12}>
                    <Typography
                        variant="body1"
                        component={Link}
                        to={getLinkToProductDetailsPageWith(
                            props.orderLine.product
                        )}
                        className={classes.productNameText}
                    >
                        {props.orderLine.product.name}
                    </Typography>
                </Grid>
                <Grid item sm={4} xs={12} container>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            className={classes.quantityText}
                        >
                            {getOrderLineQuantityText(props.orderLine)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            className={classes.priceText}
                        >
                            {getPriceTextWithCurrency(
                                calculateOrderLinePrice(props.orderLine)
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderLinesListElement;
