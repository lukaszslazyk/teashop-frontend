import { Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    totalPrice: number;
    shippingPrice: number;
}

const CheckoutSummaryPriceView = (props: Props) => {
    const classes = useStyles();

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
                        {props.shippingPrice.toFixed(2)} EUR
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
                        {props.totalPrice.toFixed(2)} EUR
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CheckoutSummaryPriceView;
