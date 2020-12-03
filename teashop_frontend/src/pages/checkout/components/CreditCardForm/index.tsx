import { Grid, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreditCard } from "../../../../domain/order/models";
import { validateCreditCardNumber } from "../../../../domain/order/services/orderService";

const expirationDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const securityCodeRegex = /^[0-9]{3,4}$/;

interface Props {
    creditCard: CreditCard;
    shouldValidate: boolean;
    setCreditCard: (value: CreditCard) => void;
    setFormValid: (value: boolean) => void;
}

const CreditCardForm = (props: Props) => {
    const { register, errors, formState, trigger, getValues } = useForm<CreditCard>({
        mode: "onTouched",
        defaultValues: props.creditCard,
    });
    const { isValid } = formState;
    const { shouldValidate, setCreditCard, setFormValid } = props;

    useEffect(() => {
        setFormValid(isValid);
    }, [isValid, setFormValid]);

    useEffect(() => {
        if (shouldValidate)
            trigger();
    }, [shouldValidate, trigger]);

    useEffect(() =>
        () => setCreditCard(getValues())
    , [setCreditCard, getValues]);

    return (
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="number"
                        inputRef={register({
                            required: "Number is required",
                            validate: validateCreditCardNumber,
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
                        name="nameOnCard"
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
                        label="Name on card"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.nameOnCard !== undefined}
                        helperText={errors.nameOnCard?.message}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="expirationDate"
                        inputRef={register({
                            required: "Expiration date is required",
                            pattern: {
                                value: expirationDateRegex,
                                message: "Expiration date is invalid",
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
                                value: securityCodeRegex,
                                message: "Security code is invalid",
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

export default CreditCardForm;
