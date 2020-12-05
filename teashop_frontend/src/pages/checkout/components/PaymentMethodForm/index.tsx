import { Box, Divider, Grid, RadioGroup, Typography } from "@material-ui/core";
import React, { ChangeEvent, ReactNode } from "react";
import PaymentCardRadio from "../PaymentCardRadio";

interface Props {
    chosenPaymentMethodName: string;
    setChosenPaymentMethod: (paymentMethodName: string) => void;
    paymentCardFormComponent: ReactNode;
}

const PaymentMethodForm = (props: Props) => {
    const {
        chosenPaymentMethodName,
        setChosenPaymentMethod,
    } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChosenPaymentMethod(event.target.value);
    };

    if (chosenPaymentMethodName === "")
        return null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" color="primary">
                    Payment method
                </Typography>
                <Box mt={1}>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <RadioGroup
                    value={chosenPaymentMethodName}
                    onChange={handleChange}
                >
                    <PaymentCardRadio
                        currentValue={chosenPaymentMethodName}
                        paymentCardFormComponent={props.paymentCardFormComponent}
                    />
                </RadioGroup>
            </Grid>
        </Grid>
    );
};

export default PaymentMethodForm;
