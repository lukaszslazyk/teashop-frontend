import { Box, Divider, Grid, RadioGroup, Typography } from "@material-ui/core";
import React, { ChangeEvent, useEffect } from "react";
import { ShippingMethod } from "../../../../domain/order/models";
import ShippingMethodFormRadio from "../ShippingMethodFormRadio";

interface Props {
    shippingMethods: ShippingMethod[];
    chosenShippingMethod: ShippingMethod | null;
    setChosenShippingMethod: (shippingMethodName: string) => void;
}

const ShippingMethodForm = (props: Props) => {
    const {
        shippingMethods,
        chosenShippingMethod,
        setChosenShippingMethod,
    } = props;

    const findShippingMethodWithName = (
        name: string
    ): ShippingMethod | undefined =>
        props.shippingMethods.find(method => method.name === name);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChosenShippingMethod(event.target.value);
    };

    useEffect(() => {
        if (!chosenShippingMethod)
            setChosenShippingMethod(shippingMethods[0].name);
    }, [shippingMethods, chosenShippingMethod, setChosenShippingMethod]);

    if (!chosenShippingMethod)
        return null;

    return (
        <form>
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
                        value={chosenShippingMethod.name}
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
        </form>
    );
};

export default ShippingMethodForm;
