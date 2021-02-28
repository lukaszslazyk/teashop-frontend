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
    const subtotalPrice = useSelector((state: RootState) => state.order.subtotalPrice);
    const shippingFee = useSelector(
        (state: RootState) => state.order.shippingFee
    );
    const paymentFee = useSelector(
        (state: RootState) => state.order.paymentFee
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
                    {getPriceTextWithCurrency(subtotalPrice)}
                </Typography>
            </Grid>
            <Grid item container>
                <Typography variant="body1">Shipment fee:</Typography>
                <Typography
                    variant="body1"
                    align="right"
                    className={classes.grow}
                >
                    {shippingFee === 0
                        ? "-"
                        : getPriceTextWithCurrency(shippingFee)}
                </Typography>
            </Grid>
            <Grid item container>
                <Typography variant="body1">Payment fee:</Typography>
                <Typography
                    variant="body1"
                    align="right"
                    className={classes.grow}
                >
                    {paymentFee === 0
                        ? "-"
                        : getPriceTextWithCurrency(paymentFee)}
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
