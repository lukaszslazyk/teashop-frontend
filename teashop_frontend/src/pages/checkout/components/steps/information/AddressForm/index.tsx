import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import useLogic from "./logic";

const AddressForm = () => {
    const logic = useLogic();
    const { countries, errors, control, register, validatePhoneNumber } = logic;

    return (
        <form noValidate>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        name="firstName"
                        inputRef={register({
                            required: "First name is required.",
                            maxLength: {
                                value: 255,
                                message:
                                    "First name must not exceed 255 characters.",
                            },
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
                            required: "Last name is required.",
                            maxLength: {
                                value: 255,
                                message:
                                    "Last name must not exceed 255 characters.",
                            },
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
                        inputRef={register({
                            maxLength: {
                                value: 255,
                                message:
                                    "Company name must not exceed 255 characters.",
                            },
                        })}
                        label="Company (optional)"
                        variant="outlined"
                        fullWidth
                        error={errors.company !== undefined}
                        helperText={errors.company?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="addressLine1"
                        inputRef={register({
                            required: "Address first line is required",
                            maxLength: {
                                value: 255,
                                message:
                                    "Address line must not exceed 255 characters.",
                            },
                        })}
                        label="Address line 1"
                        variant="outlined"
                        fullWidth
                        error={errors.addressLine1 !== undefined}
                        helperText={errors.addressLine1?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="addressLine2"
                        inputRef={register({
                            maxLength: {
                                value: 255,
                                message:
                                    "Address line must not exceed 255 characters.",
                            },
                        })}
                        label="Address line 2 (optional)"
                        variant="outlined"
                        fullWidth
                        error={errors.addressLine2 !== undefined}
                        helperText={errors.addressLine2?.message}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="postalCode"
                        inputRef={register({
                            required: "Postal code is required",
                            maxLength: {
                                value: 10,
                                message:
                                    "Postal code must not exceed 10 characters.",
                            },
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
                            maxLength: {
                                value: 255,
                                message:
                                    "City name must not exceed 255 characters.",
                            },
                        })}
                        label="City"
                        variant="outlined"
                        fullWidth
                        error={errors.city !== undefined}
                        helperText={errors.city?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Controller
                            control={control}
                            name="countryCode"
                            as={
                                <Select labelId="country-label" label="Country">
                                    {countries.map(country => (
                                        <MenuItem
                                            key={country.code}
                                            value={country.code}
                                        >
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                        ></Controller>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="phone"
                        inputRef={register({
                            required: "Phone is required",
                            validate: validatePhoneNumber,
                            setValueAs: value => value.replace(/\s/g, ""),
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

export default AddressForm;
