import { Box, Divider, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const ShippingAddressForm = () => {
    const classes = useStyles();

    return (
        <form className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                        Shipping address
                    </Typography>
                    <Box mt={1}>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="first-name"
                        label="First name"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="last-name"
                        label="Last name"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="company"
                        label="Company (optional)"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="adress"
                        label="Address line 1"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="adress"
                        label="Address line 2 (optional)"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="postal-code"
                        label="Postal code"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="city"
                        label="City"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    
                </Grid> */}
                <Grid item xs={12}>
                    <TextField
                        id="phone"
                        label="Phone number"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default ShippingAddressForm;
