import { Box, Typography } from "@material-ui/core";
import React from "react";

interface Props {
    activeStep: number;
}

const CheckoutStepTitle = (props: Props) => {
    if (props.activeStep === 4)
        return null;

    return (
        <Box mb={1}>
            <Typography variant="h5" color="primary">
                {props.activeStep === 0 && "Information"}
                {props.activeStep === 1 && "Shipping"}
                {props.activeStep === 2 && "Payment"}
                {props.activeStep === 3 && "Summary"}
            </Typography>
        </Box>
    );
};

export default CheckoutStepTitle;
