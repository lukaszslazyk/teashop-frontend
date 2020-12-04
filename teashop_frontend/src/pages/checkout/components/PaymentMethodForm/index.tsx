import { Box, Divider, Grid, RadioGroup, Typography } from "@material-ui/core";
import React, { ChangeEvent, ReactNode, useEffect } from "react";
import { PaymentMethod } from "../../../../domain/order/models";
import PaymentCardRadio from "../PaymentCardRadio";

interface Props {
    paymentMethods: PaymentMethod[];
    chosenPaymentMethod: PaymentMethod | null;
    setChosenPaymentMethod: (paymentMethodName: string) => void;
    paymentCardFormComponent: ReactNode;
}

const PaymentMethodForm = (props: Props) => {
    const {
        paymentMethods,
        chosenPaymentMethod,
        setChosenPaymentMethod,
    } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChosenPaymentMethod(event.target.value);
    };

    useEffect(() => {
        if (!chosenPaymentMethod)
            setChosenPaymentMethod(paymentMethods[0].name);
    }, [paymentMethods, chosenPaymentMethod, setChosenPaymentMethod]);

    if (!chosenPaymentMethod)
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
                    value={chosenPaymentMethod.name}
                    onChange={handleChange}
                >
                    <PaymentCardRadio
                        currentValue={chosenPaymentMethod.name}
                        paymentCardFormComponent={props.paymentCardFormComponent}
                    />
                </RadioGroup>
            </Grid>
        </Grid>
    );
};

export default PaymentMethodForm;
