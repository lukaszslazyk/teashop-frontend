import {
    Box,
    Divider,
    Grid,
    Typography,
} from "@material-ui/core";
import React from "react";
import AddressForm from "../AddressForm";

const ShippingAddressForm = () => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h6" color="primary">
                Shipping address
            </Typography>
            <Box mt={1}>
                <Divider />
            </Box>
        </Grid>
        <Grid item xs={12}>
            <AddressForm />
        </Grid>
    </Grid>
);

export default ShippingAddressForm;
