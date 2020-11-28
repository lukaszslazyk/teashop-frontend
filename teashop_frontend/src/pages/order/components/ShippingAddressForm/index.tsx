import { Box, Divider, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import useStyles from "./styles";

interface FormData {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    phone: string;
}

const ShippingAddressForm = () => {
    const classes = useStyles();
    const { register, errors } = useForm<FormData>({
        mode: "onTouched",
    });

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
                        name="firstName"
                        inputRef={register({
                            required: "First name is required",
                        })}
                        label="First name"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.firstName !== undefined}
                        helperText={errors.firstName?.message}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="lastName"
                        inputRef={register({
                            required: "Last name is required",
                        })}
                        label="Last name"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.lastName !== undefined}
                        helperText={errors.lastName?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="company"
                        inputRef={register}
                        label="Company (optional)"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="address1"
                        inputRef={register({
                            required: "Address is required",
                        })}
                        label="Address line 1"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.address1 !== undefined}
                        helperText={errors.address1?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="address2"
                        inputRef={register}
                        label="Address line 2 (optional)"
                        variant="outlined"
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="postalCode"
                        inputRef={register({
                            required: "Postal code is required",
                        })}
                        label="Postal code"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.postalCode !== undefined}
                        helperText={errors.postalCode?.message}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="city"
                        inputRef={register({
                            required: "City is required",
                        })}
                        label="City"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.city !== undefined}
                        helperText={errors.city?.message}
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    
                </Grid> */}
                <Grid item xs={12}>
                    <TextField
                        name="phone"
                        inputRef={register({
                            required: "Phone is required",
                        })}
                        label="Phone number"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.phone !== undefined}
                        helperText={errors.phone?.message}
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default ShippingAddressForm;
