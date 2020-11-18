import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { Cart } from "../../../../domain/cart/models";
import CartItemListElement from "../CartItemListElement";

interface Props {
    cart: Cart;
    interactionDisabled: boolean;
    removeItemFromCartCallback: (productId: string) => void;
}

const CartItemList = (props: Props) => (
    <Grid container spacing={5}>
        {props.cart.items.map((cartItem) => (
            <Grid item xs={12}>
                <Paper>
                    <CartItemListElement
                        cartItem={cartItem}
                        interactionDisabled={props.interactionDisabled}
                        removeItemFromCartCallback={
                            props.removeItemFromCartCallback
                        }
                    />
                </Paper>
            </Grid>
        ))}
    </Grid>
);

export default CartItemList;
