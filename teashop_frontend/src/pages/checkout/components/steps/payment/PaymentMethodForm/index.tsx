import { Box, Divider, Grid, RadioGroup, Typography } from "@material-ui/core";
import React, { ReactNode} from "react";
import CardPaymentMethodRadio from "../CardPaymentMethodRadio";
import PaymentMethodRadio from "../PaymentMethodRadio";
import useLogic from "./logic";

interface Props {
    paymentCardFormComponent: ReactNode;
}

const PaymentMethodForm = (props: Props) => {
    const logic = useLogic();
    const { paymentMethods, chosenPaymentMethodName } = logic;

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
                    onChange={logic.handleChange}
                >
                    {paymentMethods.map(method => {
                        if (method.name === "card")
                            return (
                                <CardPaymentMethodRadio
                                    currentValue={chosenPaymentMethodName}
                                    paymentCardFormComponent={
                                        props.paymentCardFormComponent
                                    }
                                    paymentMethod={method}
                                />
                            );
                        return <PaymentMethodRadio paymentMethod={method} />;
                    })}
                </RadioGroup>
            </Grid>
        </Grid>
    );
};

export default PaymentMethodForm;
