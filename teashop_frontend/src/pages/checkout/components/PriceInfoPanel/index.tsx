import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
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
                <Typography variant="body1">
                    Subtotal:
                </Typography>
                <Typography variant="body1" align="right" className={classes.grow}>
                    {props.cartPrice.toFixed(2)} EUR
                </Typography>
            </Grid>
            <Grid item container>
                <Typography variant="body1">
                    Shipment:
                </Typography>
                <Typography variant="body1" align="right" className={classes.grow}>
                    {props.shippingPrice === 0 ? "-" : `${props.shippingPrice} EUR`}
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
                    {props.totalPrice.toFixed(2)} EUR
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PriceInfoPanel;
