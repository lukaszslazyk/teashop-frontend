import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Country, ShippingAddress } from "../../../../domain/order/models";
import useStyles from "./styles";

interface Props {
    availableCountries: Country[];
    shippingAddress: ShippingAddress;
    shouldValidate: boolean;
    setShippingAddress: (value: ShippingAddress) => void;
    setFormValid: (value: boolean) => void;
}

const ShippingAddressForm = (props: Props) => {
    const classes = useStyles();
    const { register, errors, formState, trigger, getValues, control } = useForm<ShippingAddress>({
        mode: "onTouched",
        defaultValues: {
            ...props.shippingAddress,
            country: props.shippingAddress.country === ""
                ? props.availableCountries[0].name
                : props.shippingAddress.country
        },
    });
    const { isValid } = formState;
    const { availableCountries, shouldValidate, setShippingAddress, setFormValid } = props;

    useEffect(() => {
        setFormValid(isValid);
    }, [isValid, setFormValid]);

    useEffect(() => {
        if (shouldValidate)
            trigger();
    }, [shouldValidate, trigger]);

    useEffect(() => () => setShippingAddress(getValues()), [setShippingAddress, getValues]);

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
                        fullWidth
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
                        fullWidth
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
                        fullWidth
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
                        fullWidth
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
                        fullWidth
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
                        fullWidth
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
                        fullWidth
                        error={errors.city !== undefined}
                        helperText={errors.city?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        variant="outlined"
                        fullWidth
                    >
                        <InputLabel id="country-label">
                            Country
                        </InputLabel>
                        <Controller
                            control={control}
                            name="country"
                            as={
                                <Select
                                    labelId="country-label"
                                    label="Country"
                                >
                                    {availableCountries.map(country => (
                                        <MenuItem key={country.name} value={country.name}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                        >
                        </Controller>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="phone"
                        inputRef={register({
                            required: "Phone is required",
                        })}
                        label="Phone number"
                        variant="outlined"
                        fullWidth
                        error={errors.phone !== undefined}
                        helperText={errors.phone?.message}
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default ShippingAddressForm;
