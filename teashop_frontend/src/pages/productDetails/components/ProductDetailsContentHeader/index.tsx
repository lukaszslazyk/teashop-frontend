import { Card, CardMedia, Grid, Hidden, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { calculateItemPriceWith } from "../../../../domain/cart/services/cartService";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import { Product } from "../../../../domain/product/models";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import AddToCartButton from "../AddToCartButton";
import useStyles from "./styles";

interface Props {
    product: Product;
    quantity: number;
    isProcessing: boolean;
    quantityChangedCallback: (value: number) => void;
    addItemToSessionCartCallback: () => void;
}

const ProductDetailsContentHeader = (props: Props) => {
    const classes = useStyles();
    const product = props.product;
    const [addToCartButtonDisabled, setAddToCartButtonDisabled] = useState(false);

    const calculatePrice = (): number =>
        calculateItemPriceWith(props.product, props.quantity);

    const productPricedByWeight = useCallback((): boolean =>
        pricedByWeight(product),
    [product]);

    const quantityInvalidCallback = () => {
        setAddToCartButtonDisabled(true);
    };

    const quantityChangedCallback = (value: number) => {
        setAddToCartButtonDisabled(false);
        props.quantityChangedCallback(value);
    };

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
                                {calculatePrice().toFixed(2)} EUR
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container
                            className={classes.productQuantityPickerContainer}
                        >
                            <ProductQuantityPicker
                                initialValue={props.product.quantityPerPrice}
                                pricedByWeight={productPricedByWeight()}
                                quantityChangedCallback={
                                    quantityChangedCallback
                                }
                                quantityInvalidCallback={
                                    quantityInvalidCallback
                                }
                            />
                        </Grid>
                        <Grid item xs={12} container
                            className={classes.addToCartButtonContainer}>
                            <AddToCartButton
                                isProcessing={props.isProcessing}
                                addItemToSessionCartCallback={
                                    props.addItemToSessionCartCallback
                                }
                                interactionDisabled={addToCartButtonDisabled}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductDetailsContentHeader;