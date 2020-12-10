import { Box, Divider, Grid, RadioGroup, Typography } from "@material-ui/core";
import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    setChosenShippingMethod,
    setShippingPrice,
} from "../../../../domain/order/actions";
import { ShippingMethod } from "../../../../domain/order/models";
import ShippingMethodFormRadio from "../ShippingMethodFormRadio";

const ShippingMethodForm = () => {
    const shippingMethods = useSelector(
        (state: RootState) => state.order.orderMeta.shippingMethods
    );
    const chosenShippingMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenShippingMethodName
    );
    const dispatch = useDispatch();

    const findShippingMethodWithName = (
        name: string
    ): ShippingMethod | undefined =>
        shippingMethods.find(method => method.name === name);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setChosenShippingMethod(event.target.value));
    };

    useEffect(() => {
        const shippingMethod = shippingMethods.find(
            method => method.name === chosenShippingMethodName
        );
        if (shippingMethod)
            dispatch(setShippingPrice(shippingMethod.price));
    }, [chosenShippingMethodName, shippingMethods, dispatch]);

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
