import { Grid, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import { Cart } from "../../../../domain/cart/models";
import { ShippingMethod } from "../../../../domain/order/models";
import { calculateTotalOrderPrice } from "../../../../domain/order/services/orderService";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    chosenShippingMethod: ShippingMethod;
}

const OrderSummaryPriceView = (props: Props) => {
    const classes = useStyles();
    const { cart, chosenShippingMethod } = props;

    const totalPrice = useMemo(() =>
        calculateTotalOrderPrice(cart, chosenShippingMethod)
    , [cart, chosenShippingMethod]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} container spacing={2}>
                <Grid item md={10} sm={9} xs={6}>
                    <Typography
                        variant="body1"
                        className={classes.valueNameText}
                    >
                        Shipping fee:
                    </Typography>
                </Grid>
                <Grid item md={2} sm={3} xs={6}>
                    <Typography variant="body1" className={classes.valueText}>
                        {chosenShippingMethod.price.toFixed(2)} EUR
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
                <Grid item md={10} sm={9} xs={6}>
                    <Typography variant="h5" className={classes.valueNameText}>
                        Total price:
                    </Typography>
                </Grid>
                <Grid item md={2} sm={3} xs={6}>
                    <Typography variant="h5" className={classes.valueText}>
                        {totalPrice.toFixed(2)} EUR
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderSummaryPriceView;
