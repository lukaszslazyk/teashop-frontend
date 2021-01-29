import { Box, Divider, Grid, RadioGroup, Typography } from "@material-ui/core";
import React from "react";
import ShippingMethodFormRadio from "../ShippingMethodFormRadio";
import useLogic from "./logic";

const ShippingMethodForm = () => {
    const logic = useLogic();
    const { shippingMethods, chosenShippingMethodName } = logic;

    if (chosenShippingMethodName === "")
        return null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" color="primary">
                    Shipping method
                </Typography>
                <Box mt={1}>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <RadioGroup
                    value={chosenShippingMethodName}
                    onChange={logic.handleChange}
                >
                    {shippingMethods.map(method => (
                        <ShippingMethodFormRadio
                            shippingMethod={method}
                            key={method.name}
                        />
                    ))}
                </RadioGroup>
            </Grid>
        </Grid>
    );
};

export default ShippingMethodForm;
