import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Cart } from "../../../../domain/cart/models";
import CartItemList from "../CartItemList";

interface Props {
    cart: Cart;
    interactionDisabled: boolean;
    removeItemFromCartCallback: (productId: string) => void;
}

const CartView = (props: Props) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" color="primary">
                    Your cart
                </Typography>
                <Box mt={1}>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <CartItemList
                    cart={props.cart}
                    interactionDisabled={props.interactionDisabled}
                    removeItemFromCartCallback={
                        props.removeItemFromCartCallback
                    }
                />
            </Grid>
        </Grid>
    );
};

export default CartView;
