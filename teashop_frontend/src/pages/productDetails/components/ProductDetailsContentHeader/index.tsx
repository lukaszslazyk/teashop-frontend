import { Card, CardMedia, Grid, Hidden, Typography } from "@material-ui/core";
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

    const ProductName = () => (
        <Grid item xs={12}>
            <Typography
                variant="h3"
                color="primary"
                className={classes.productNameText}
            >
                {props.product.name}
            </Typography>
        </Grid>
    );

    return (
        <div>
            <Grid container spacing={3}>
                <Hidden smUp>{ProductName()}</Hidden>
                <Grid item md={4} sm={6} xs={12}>
                    <Card square>
                        <CardMedia
                            className={classes.cardMedia}
                            image={getImageFullUrl(props.product.imagePath)}
                            title="Product"
                        />
                    </Card>
                </Grid>
                <Grid item md={8} sm={6} xs={12}>
                    <Grid container spacing={3}>
                        {/*
                            Bug in Material-UI library: should be smDown,
                            but Hidden's Down prop behaves as one size larger
                            than declared, that's why xsDown is used here
                        */}
                        <Hidden xsDown>{ProductName()}</Hidden>
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
        </div>
    );
};

export default ProductDetailsContentHeader;
