import { Card, CardMedia, Grid, Hidden, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import { Product } from "../../../../domain/product/models";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { calculateItemPriceWith } from "../../../../domain/cart/services/cartService";
import AddToCartButton from "../AddToCartButton";
import useStyles from "./styles";

interface Props {
    product: Product | null;
    quantity: number;
    isProcessing: boolean;
    quantityChangedCallback: (value: number) => void;
    addItemToSessionCartCallback: () => void;
}

const ProductDetailsContentHeader = (props: Props) => {
    const classes = useStyles();
    const product = props.product;
    const [addToCartButtonDisabled, setAddToCartButtonDisabled] = React.useState(false);

    const calculatePrice = (): number => {
        if (props.product)
            return calculateItemPriceWith(props.product, props.quantity);

        return 0;
    };

    const productPricedByWeight = useCallback((): boolean => {
        if (product)
            return pricedByWeight(product);

        return false;
    }, [product]);

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
                {props.product?.name}
            </Typography>
        </Grid>
    );

    return (
        <div>
            <Grid container spacing={3}>
                <Hidden smUp>{ProductName()}</Hidden>
                <Grid item md={4} sm={6} xs={12}>
                    <Card square>
                        {props.product &&
                            <CardMedia
                                className={classes.cardMedia}
                                image={getImageFullUrl(props.product.imagePath)}
                                title="Product"
                            />
                        }
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
                        {props.product && (
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
                        )}
                        {props.product && (
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
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductDetailsContentHeader;
