import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import useStyles from "./styles";

interface Props {
    totalPrice: number;
    shippingPrice: number;
}

const OrderPriceView = (props: Props) => {
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
                        {getPriceTextWithCurrency(props.shippingPrice)}
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
                        {getPriceTextWithCurrency(props.totalPrice)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderPriceView;
