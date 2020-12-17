import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";

interface Props {
    activeStep: number;
}

const CheckoutStepTitle = (props: Props) => {
    if (props.activeStep === 4)
        return null;

    return (
        <div>
            <Typography variant="h5" color="primary">
                {props.activeStep === 0 && "Information"}
                {props.activeStep === 1 && "Shipping"}
                {props.activeStep === 2 && "Payment"}
                {props.activeStep === 3 && "Summary"}
            </Typography>
            <Box mt={1} mb={2}>
                <Divider />
            </Box>
        </div>
    );
};

export default CheckoutStepTitle;
