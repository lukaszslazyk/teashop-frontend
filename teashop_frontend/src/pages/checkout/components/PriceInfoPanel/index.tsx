import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import useStyles from "./styles";

const PriceInfoPanel = () => {
    const totalPrice = useSelector(
        (state: RootState) => state.order.totalPrice
    );
    const cartPrice = useSelector(
        (state: RootState) => state.order.cartPrice
    );
    const shippingPrice = useSelector(
        (state: RootState) => state.order.shippingPrice
    );
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid item container>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography
                    variant="body1"
                    align="right"
                    className={classes.grow}
                >
                    {getPriceTextWithCurrency(cartPrice)}
                </Typography>
            </Grid>
            <Grid item container>
                <Typography variant="body1">Shipment:</Typography>
                <Typography
                    variant="body1"
                    align="right"
                    className={classes.grow}
                >
                    {shippingPrice === 0
                        ? "-"
                        : getPriceTextWithCurrency(shippingPrice)}
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dividerContainer}>
                <Divider />
            </Grid>
            <Grid item container>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" align="right" className={classes.grow}>
                    {getPriceTextWithCurrency(totalPrice)}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PriceInfoPanel;
