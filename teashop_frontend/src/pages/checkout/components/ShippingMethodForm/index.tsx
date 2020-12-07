import { Box, Divider, Grid, RadioGroup, Typography } from "@material-ui/core";
import React, { ChangeEvent, useEffect } from "react";
import { ShippingMethod } from "../../../../domain/order/models";
import ShippingMethodFormRadio from "../ShippingMethodFormRadio";

interface Props {
    shippingMethods: ShippingMethod[];
    chosenShippingMethodName: string;
    setChosenShippingMethod: (shippingMethodName: string) => void;
    setShippingPrice: (value: number) => void;
}

const ShippingMethodForm = (props: Props) => {
    const {
        shippingMethods,
        chosenShippingMethodName,
        setChosenShippingMethod,
        setShippingPrice,
    } = props;

    const findShippingMethodWithName = (
        name: string
    ): ShippingMethod | undefined =>
        props.shippingMethods.find(method => method.name === name);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChosenShippingMethod(event.target.value);
    };

    useEffect(() => {
        const shippingMethod = shippingMethods.find(
            method => method.name === chosenShippingMethodName
        );
        if (shippingMethod)
            setShippingPrice(shippingMethod.price);
    }, [chosenShippingMethodName, shippingMethods, setShippingPrice]);

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
                    onChange={handleChange}
                >
                    <ShippingMethodFormRadio
                        value="standard"
                        label="Standard delivery"
                        shippingMethod={findShippingMethodWithName("standard")}
                    />
                </RadioGroup>
            </Grid>
        </Grid>
    );
};

export default ShippingMethodForm;
