import { Card, CardMedia, Grid, Hidden, Typography } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { Product } from "../../../../product/models";
import ProductQuantityPicker from "../ProductQuantityPicker";
import useStyles from "./styles";

const IMAGES_ROOT = process.env.REACT_APP_CDN_ROOT;

interface Props {
    product: Product | null;
    quantity: number;
    setQuantity: (value: number) => void;
}

const ProductDetailsContentHeader = (props: Props) => {
    const classes = useStyles();    
    const product = props.product;
    const setQuantity = props.setQuantity;

    const calculatePrice = (): number => {
        if (props.product)
            return (
                (props.product.price * props.quantity) /
                props.product.quantityPerPrice
            );
        return 0;
    };

    const productPricedByWeight = useCallback((): boolean => {
        if (product)
            return product.quantityPerPrice > 1;
        else
            return false;
    }, [product]);

    useEffect(() => {
        if (product) {
            if (productPricedByWeight())
                setQuantity(100);
            else
                setQuantity(1);
        }
    }, [product, setQuantity, productPricedByWeight]);

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
                        <CardMedia
                            className={classes.cardMedia}
                            image={`${IMAGES_ROOT}/${props.product?.imagePath}`}
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
                        {props.product && (
                            <Grid item xs={12}>
                                <ProductQuantityPicker
                                    initialValue={props.product.quantityPerPrice}
                                    pricedByWeight={productPricedByWeight()}
                                    setQuantityCallback={props.setQuantity}
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
