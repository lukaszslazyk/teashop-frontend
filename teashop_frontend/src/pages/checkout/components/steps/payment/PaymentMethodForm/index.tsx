import { Box, RadioGroup, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";
import CardPaymentMethodRadio from "../CardPaymentMethodRadio";
import PaymentMethodRadio from "../PaymentMethodRadio";
import useLogic from "./logic";

interface Props {
    paymentCardFormComponent: ReactNode;
}

const PaymentMethodForm = (props: Props) => {
    const {
        paymentMethods,
        chosenPaymentMethodName,
        handleChange,
    } = useLogic();

    if (chosenPaymentMethodName === "")
        return null;

    return (
        <div>
            <Box mb={1}>
                <Typography variant="h6" color="primary">
                    Payment method
                </Typography>
            </Box>
            <RadioGroup value={chosenPaymentMethodName} onChange={handleChange}>
                {paymentMethods.map(method => {
                    if (method.name === "card")
                        return (
                            <CardPaymentMethodRadio
                                currentValue={chosenPaymentMethodName}
                                paymentCardFormComponent={
                                    props.paymentCardFormComponent
                                }
                                paymentMethod={method}
                                key={method.name}
                            />
                        );
                    return (
                        <PaymentMethodRadio
                            paymentMethod={method}
                            key={method.name}
                        />
                    );
                })}
            </RadioGroup>
        </div>
    );
};

export default PaymentMethodForm;
