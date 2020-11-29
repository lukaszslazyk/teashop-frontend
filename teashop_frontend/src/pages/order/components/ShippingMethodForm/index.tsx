import { Box, Divider, Grid, RadioGroup, Typography } from "@material-ui/core";
import React, { ChangeEvent, useEffect } from "react";
import { ShippingMethod } from "../../../../domain/order/models";
import ShippingMethodFormRadio from "../ShippingMethodFormRadio";

interface Props {
    shippingMethods: ShippingMethod[];
    setChosenShippingMethod: (shippingMethodName: string) => void;
}

const ShippingMethodForm = (props: Props) => {
    const [chosenMethod, setChosenMethod] = React.useState(
        props.shippingMethods[0].name
    );
    const { setChosenShippingMethod } = props;

    const findShippingMethodWithName = (
        name: string
    ): ShippingMethod | undefined =>
        props.shippingMethods.find(method => method.name === name);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChosenMethod(event.target.value);
    };

    useEffect(() =>
        () => setChosenShippingMethod(chosenMethod)
    , [chosenMethod, setChosenShippingMethod]);

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
                    <RadioGroup value={chosenMethod} onChange={handleChange}>
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
