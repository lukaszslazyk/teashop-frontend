import { Divider, Grid, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import { Cart } from "../../../../domain/cart/models";
import { calculateCartPrice } from "../../../../domain/cart/services/cartService";
import { ShippingMethod } from "../../../../domain/order/models";
import { calculateTotalOrderPrice } from "../../../../domain/order/services/orderService";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    chosenShippingMethod: ShippingMethod | null;
}

const PriceInfoPanel = (props: Props) => {
    const classes = useStyles();
    const { cart, chosenShippingMethod } = props;
    
    const cartPrice = useMemo((): number =>
        calculateCartPrice(cart)
    , [cart]);

    const shippingPrice = useMemo((): number | null => {
        if (chosenShippingMethod)
            return chosenShippingMethod.price;
        return null;
    }, [chosenShippingMethod]);

    const totalPrice = useMemo((): number =>
        calculateTotalOrderPrice(cart, chosenShippingMethod)
    , [cart, chosenShippingMethod]);

    return (
        <Grid container spacing={1}>
            <Grid item container>
                <Typography variant="body1">
                    Subtotal:
                </Typography>
                <Typography variant="body1" align="right" className={classes.grow}>
                    {cartPrice.toFixed(2)} EUR
                </Typography>
            </Grid>
            <Grid item container>
                <Typography variant="body1">
                    Shipment:
                </Typography>
                <Typography variant="body1" align="right" className={classes.grow}>
                    {shippingPrice ? `${shippingPrice.toFixed(2)} EUR` : "-"}
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dividerContainer}>
                <Divider/>
            </Grid>
            <Grid item container>
                <Typography variant="h6">
                    Total:
                </Typography>
                <Typography variant="h6" align="right" className={classes.grow}>
                    {totalPrice.toFixed(2)} EUR
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PriceInfoPanel;
