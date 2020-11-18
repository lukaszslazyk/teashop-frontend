import { Fab, Grid, Typography } from "@material-ui/core";
import React from "react";
import { CartItem } from "../../../../domain/cart/models";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";

const IMAGES_ROOT = process.env.REACT_APP_CDN_ROOT;

interface Props {
    cartItem: CartItem;
}

const CartItemListElement = (props: Props) => {
    const classes = useStyles();

    const calculatePrice = (): number => {
        return (
            (props.cartItem.product.price * props.cartItem.quantity) /
            props.cartItem.product.quantityPerPrice
        );
    };

    const sample = () => {};

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            spacing={3}
            className={classes.root}
        >
            <Grid item>
                <img
                    src={`${IMAGES_ROOT}/${props.cartItem.product.imagePath}`}
                    alt="product"
                    className={classes.image}
                />
            </Grid>
            <Grid item className={classes.contentContainer}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item className={classes.productNameTextContainer}>
                        <Typography variant="h6">
                            {props.cartItem.product.name}
                        </Typography>
                    </Grid>                        
                    <Grid item>
                        <Typography variant="h6">
                            {calculatePrice().toFixed(2)} EUR
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="center" spacing={3} className={classes.buttonsContainer}>
                            <Grid item>
                                <ProductQuantityPicker
                                    initialValue={props.cartItem.quantity}
                                    pricedByWeight={
                                        props.cartItem.product.quantityPerPrice > 1
                                    }
                                    setQuantityCallback={sample}
                                />
                            </Grid>
                            <Grid item>
                                <Fab size="small" className={classes.removeButton}>
                                    <DeleteIcon />
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CartItemListElement;
