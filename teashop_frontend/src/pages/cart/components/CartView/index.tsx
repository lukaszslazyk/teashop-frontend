import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../../configuration/routing";
import { Cart } from "../../../../domain/cart/models";
import { calculateCartPrice } from "../../../../domain/cart/services/cartService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import CartItemList from "../CartItemList";
import useStyles from "./styles";

interface Props {
    cart: Cart;
}

const CartView = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" color="primary">
                    Your cart
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CartItemList cart={props.cart} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" className={classes.totalPriceText}>
                    Total price:{" "}
                    {getPriceTextWithCurrency(calculateCartPrice(props.cart))}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container className={classes.checkoutButtonContainer}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={routing.checkout}
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
