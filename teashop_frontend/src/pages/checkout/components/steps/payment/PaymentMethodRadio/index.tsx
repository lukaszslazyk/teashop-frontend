import { FormControlLabel, Paper, Radio, Typography } from "@material-ui/core";
import React from "react";
import { PaymentMethod } from "../../../../../../domain/order/models";
import { getPriceTextWithCurrency } from "../../../../../../shared/services/priceService";
import useStyles from "./styles";

interface Props {
    paymentMethod: PaymentMethod;
}

const PaymentMethodRadio = (props: Props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.radioContainer}>
            <FormControlLabel
                control={<Radio />}
                value={props.paymentMethod.name}
                label={props.paymentMethod.displayName}
                className={classes.grow}
            />
            <Typography
                variant="body1"
                align="right"
            >
                {getPriceTextWithCurrency(props.paymentMethod.fee)}
            </Typography>
        </Paper>
    );
};

export default PaymentMethodRadio;
