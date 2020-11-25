import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../../../../domain/cart/models";
import CartItemList from "../CartItemList";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    interactionDisabled: boolean;
    updateItemQuantityCallback: (productId: string, quantity: number) => void;
    removeItemFromCartCallback: (productId: string) => void;
}

const CartView = (props: Props) => {
    const classes = useStyles();
    const [invalidCount, setInvalidCount] = useState(0);

    const calculatePrice = (): number =>
        props.cart.items
            .map(
                item =>
                    item.product.price * item.quantity /
                    item.product.quantityPerPrice
            )
            .reduce((x, y) => x + y, 0);

    const canProceedToCheckout = (): boolean =>
        invalidCount === 0;

    const quantityInvalid = () => {
        setInvalidCount(invalidCount + 1);
    };

    const quantityValid = () => {
        setInvalidCount(invalidCount - 1);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" color="primary">
                    Your cart
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CartItemList
                    cart={props.cart}
                    interactionDisabled={props.interactionDisabled}
                    updateItemQuantityCallback={
                        props.updateItemQuantityCallback
                    }
                    removeItemFromCartCallback={
                        props.removeItemFromCartCallback
                    }
                    quantityInvalidCallback={quantityInvalid}
                    quantityValidCallback={quantityValid}
                />
            </Grid>
            <Grid item xs={12}>
                <Box mt={1}>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" className={classes.totalPriceText}>
                    Total price: {calculatePrice().toFixed(2)} EUR
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container className={classes.checkoutButtonContainer}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/order"
                            disabled={!canProceedToCheckout()}
                        >
                            Proceed to checkout
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CartView;
