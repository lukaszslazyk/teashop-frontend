import { Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import useStyles from "./styles";

interface Props {
    cartPrice: number;
}

const PriceInfoPanel = (props: Props) => {
    const classes = useStyles();
    const { cartPrice } = props;
    
    const getCartPriceText = useCallback(():string =>
        `${cartPrice.toFixed(2)} EUR`
    , [cartPrice]);
    
    return (
        <Grid container spacing={1}>
            <Grid item container>
                <Typography variant="body1">
                    Subtotal:
                </Typography>
                <Typography variant="body1" align="right" className={classes.grow}>
                    {getCartPriceText()}
                </Typography>
            </Grid>
            <Grid item container>
                <Typography variant="body1">
                    Shipment:
                </Typography>
                <Typography variant="body1" align="right" className={classes.grow}>
                    -
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
                    {getCartPriceText()}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PriceInfoPanel;
