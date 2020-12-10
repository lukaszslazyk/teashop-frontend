import { Box, Divider, Grid, RadioGroup, Typography } from "@material-ui/core";
import React, { ChangeEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import { setChosenPaymentMethod } from "../../../../../../domain/order/actions";
import PaymentCardRadio from "../PaymentCardRadio";

interface Props {
    paymentCardFormComponent: ReactNode;
}

const PaymentMethodForm = (props: Props) => {
    const chosenPaymentMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenPaymentMethodName
    );
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setChosenPaymentMethod(event.target.value));
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
                        paymentCardFormComponent={
                            props.paymentCardFormComponent
                        }
                    />
                </RadioGroup>
            </Grid>
        </Grid>
    );
};

export default PaymentMethodForm;
