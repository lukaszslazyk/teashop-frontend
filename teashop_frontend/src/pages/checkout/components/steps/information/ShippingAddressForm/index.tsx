import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import AddressForm from "../AddressForm";
import useStyles from "./styles";

const ShippingAddressForm = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.surface}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                        Shipping address
                    </Typography>
                    <Box my={1}>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <AddressForm />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ShippingAddressForm;
