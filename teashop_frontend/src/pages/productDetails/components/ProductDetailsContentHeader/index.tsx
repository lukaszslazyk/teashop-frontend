import { Grid, Hidden, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { calculateItemPriceWith } from "../../../../domain/cart/services/cartService";
import { Product } from "../../../../domain/product/models";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import AddToCartPanel from "../AddToCartPanel";
import useStyles from "./styles";

interface Props {
    product: Product;
}

const ProductDetailsContentHeader = (props: Props) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(props.product.quantityPerPrice);
    const { product } = props;

    const handleQuantityChanged = (value: number) => setQuantity(value);

    const getProductNameTypographyVariant = () => {
        if (product.name.length <= 25)
            return "h3";
        return "h4";
    };

    const ProductName = (top: boolean) => (
        <Grid
            item
            xs={12}
            className={top ? classes.topProductNameTextContainer : ""}
        >
            <Typography
                variant={getProductNameTypographyVariant()}
                color="primary"
                className={classes.productNameText}
            >
                {props.product.name}
            </Typography>
        </Grid>
    );

    return (
        <Grid container spacing={4} className={classes.root}>
            <Hidden mdUp>{ProductName(true)}</Hidden>
            <Grid item md={6} sm={7} xs={12}>
                <Paper className={classes.imageWrapper}>
                    <img
                        src={getImageFullUrl(props.product.imagePath)}
                        alt="Product"
                        className={classes.image}
                    />
                </Paper>
            </Grid>
            <Grid item md={6} sm={5} xs={12} container spacing={3}>
                <Hidden smDown>{ProductName(false)}</Hidden>
                <Grid item xs={12} className={classes.flexiblePanel}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                className={classes.priceText}
                            >
                                {getPriceTextWithCurrency(
                                    calculateItemPriceWith(product, quantity)
                                )}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AddToCartPanel
                                product={props.product}
                                onQuantityChange={handleQuantityChanged}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductDetailsContentHeader;
