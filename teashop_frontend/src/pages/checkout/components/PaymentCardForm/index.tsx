import { Grid, TextField } from "@material-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";
import { validatePaymentCardNumber } from "../../../../domain/order/services/orderService";

const expirationDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const securityCodePattern = /^[0-9]{3,4}$/;

const PaymentCardForm = () => {
    const { register, errors } = useFormContext();

    return (
        <form noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="number"
                        inputRef={register({
                            required: "Number is required",
                            validate: validatePaymentCardNumber,
                            setValueAs: value => value.replace(/\s/g, "")
                        })}
                        label="Number"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.number !== undefined}
                        helperText={errors.number?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="name"
                        inputRef={register({
                            required: "Name is required",
                            minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters long.",
                            },
                            maxLength: {
                                value: 26,
                                message: "Name must not exceed 26 characters.",
                            },
                        })}
                        label="Name"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.name !== undefined}
                        helperText={errors.name?.message}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="expirationDate"
                        inputRef={register({
                            required: "Expiration date is required",
                            pattern: {
                                value: expirationDatePattern,
                                message: "Expiration date is incorrect",
                            },
                        })}
                        label="Expiration date (MM/YY)"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.expirationDate !== undefined}
                        helperText={errors.expirationDate?.message}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="securityCode"
                        inputRef={register({
                            required: "Security code is required",
                            pattern: {
                                value: securityCodePattern,
                                message: "Security code is incorrect",
                            },
                        })}
                        label="Security code"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.securityCode !== undefined}
                        helperText={errors.securityCode?.message}
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default PaymentCardForm;
