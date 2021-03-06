import { FormControlLabel, Paper, Radio, Typography } from "@material-ui/core";
import React from "react";
import { ShippingMethod } from "../../../../../../domain/order/models";
import { getPriceTextWithCurrency } from "../../../../../../shared/services/priceService";
import useStyles from "./styles";

interface Props {
    shippingMethod: ShippingMethod;
}

const ShippingMethodFormRadio = (props: Props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.radioContainer}>
            <FormControlLabel
                control={<Radio />}
                value={props.shippingMethod.name}
                label={props.shippingMethod.displayName}
                className={classes.grow}
            />
            <Typography variant="body1" align="right">
                {getPriceTextWithCurrency(props.shippingMethod.fee)}
            </Typography>
        </Paper>
    );
};

export default ShippingMethodFormRadio;
