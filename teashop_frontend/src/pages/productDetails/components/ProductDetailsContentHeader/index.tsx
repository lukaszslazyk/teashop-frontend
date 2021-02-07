import { Grid, Hidden, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { calculateItemPriceWith } from "../../../../domain/cart/services/cartService";
import { Product } from "../../../../domain/product/models";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import AddToCartPanel from "../AddToCartPanel";
import ProductDetailsContentHeaderProductNameView from "../ProductDetailsContentHeaderProductNameView";
import useStyles from "./styles";

interface Props {
    product: Product;
}

const ProductDetailsContentHeader = (props: Props) => {
    const { product } = props;
    const [quantity, setQuantity] = useState(props.product.quantityPerPrice);
    const classes = useStyles();

    const handleQuantityChanged = (value: number) => setQuantity(value);

    return (
        <Grid container spacing={3} className={classes.root}>
            <Hidden mdUp>
                <ProductDetailsContentHeaderProductNameView
                    productName={product.name}
                    top
                />
            </Hidden>
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
                <Hidden smDown>
                    <ProductDetailsContentHeaderProductNameView
                        productName={product.name}
                    />
                </Hidden>
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
