import { FormControlLabel, Paper, Radio, Typography } from "@material-ui/core";
import React from "react";
import { ShippingMethod } from "../../../../domain/order/models";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import useStyles from "./styles";

interface Props {
    value: string;
    label: string;
    shippingMethod: ShippingMethod | undefined;
}

const ShippingMethodFormRadio = (props: Props) => {
    const classes = useStyles();

    if (!props.shippingMethod)
        return null;

    return (
        <Paper className={classes.radioContainer}>
            <FormControlLabel
                control={<Radio />}
                value={props.value}
                label={props.label}
            />
            <Typography
                variant="body1"
                align="right"
                className={classes.grow}
            >
                {getPriceTextWithCurrency(props.shippingMethod.price)}
            </Typography>
        </Paper>
    );
};

export default ShippingMethodFormRadio;
