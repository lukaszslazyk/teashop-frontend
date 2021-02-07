import { Box, RadioGroup, Typography } from "@material-ui/core";
import React from "react";
import ShippingMethodFormRadio from "../ShippingMethodFormRadio";
import useLogic from "./logic";

const ShippingMethodForm = () => {
    const {
        shippingMethods,
        chosenShippingMethodName,
        handleChange,
    } = useLogic();

    if (chosenShippingMethodName === "")
        return null;

    return (
        <div>
            <Box mb={1}>
                <Typography variant="h6" color="primary">
                    Shipping method
                </Typography>
            </Box>
            <RadioGroup
                value={chosenShippingMethodName}
                onChange={handleChange}
            >
                {shippingMethods.map(method => (
                    <ShippingMethodFormRadio
                        shippingMethod={method}
                        key={method.name}
                    />
                ))}
            </RadioGroup>
        </div>
    );
};

export default ShippingMethodForm;
