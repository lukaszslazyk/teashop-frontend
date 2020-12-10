import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import useStyles from "./styles";

interface Props {
    totalPrice: number;
    cartPrice: number;
    shippingPrice: number;
}

const PriceInfoPanel = (props: Props) => {
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
                    {getPriceTextWithCurrency(props.cartPrice)}
                </Typography>
            </Grid>
            <Grid item container>
                <Typography variant="body1">Shipment:</Typography>
                <Typography
                    variant="body1"
                    align="right"
                    className={classes.grow}
                >
                    {props.shippingPrice === 0
                        ? "-"
                        : getPriceTextWithCurrency(props.shippingPrice)}
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dividerContainer}>
                <Divider />
            </Grid>
            <Grid item container>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" align="right" className={classes.grow}>
                    {getPriceTextWithCurrency(props.totalPrice)}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PriceInfoPanel;
