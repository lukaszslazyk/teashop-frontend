import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { Cart } from "../../../../domain/cart/models";
import CartItemListElement from "../CartItemListElement";

interface Props {
    cart: Cart;
    interactionDisabled: boolean;
    updateItemQuantityCallback: (productId: string, quantity: number) => void;
    removeItemFromCartCallback: (productId: string) => void;
    quantityInvalidCallback: () => void;
    quantityValidCallback: () => void;
}

const CartItemList = (props: Props) => (
    <Grid container spacing={5}>
        {props.cart.items.map(cartItem => (
            <Grid item key={cartItem.product.id} xs={12}>
                <Paper>
                    <CartItemListElement
                        cartItem={cartItem}
                        interactionDisabled={props.interactionDisabled}
                        updateItemQuantityCallback={
                            props.updateItemQuantityCallback
                        }
                        removeItemFromCartCallback={
                            props.removeItemFromCartCallback
                        }
                        quantityInvalidCallback={
                            props.quantityInvalidCallback
                        }
                        quantityValidCallback={
                            props.quantityValidCallback
                        }
                    />
                </Paper>
            </Grid>
        ))}
    </Grid>
);

export default CartItemList;
