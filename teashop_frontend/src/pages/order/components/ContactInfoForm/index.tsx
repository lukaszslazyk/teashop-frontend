import { Box, Divider, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ContactInfo } from "../../../../domain/order/models";

interface Props {
    contactInfo: ContactInfo;
    shouldValidate: boolean;
    setContactInfo: (value: ContactInfo) => void;
    setFormValid: (value: boolean) => void;
}

const ContactInfoForm = (props: Props) => {
    const { register, errors, formState, trigger, getValues } = useForm<ContactInfo>({
        mode: "onTouched",
        defaultValues: props.contactInfo
    });
    const { isValid } = formState;
    const { shouldValidate, setContactInfo, setFormValid } = props;
    
    useEffect(() => {
        setFormValid(isValid);
    }, [isValid, setFormValid]);

    useEffect(() => {
        if (shouldValidate)
            trigger();
    }, [shouldValidate, trigger]);

    useEffect(() => () => setContactInfo(getValues()), [setContactInfo, getValues]);

    return (
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                        Contact information
                    </Typography>
                    <Box mt={1}>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        inputRef={register({
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                                message: "Email is invalid",
                            },
                        })}
                        label="Email"
                        variant="outlined"
                        fullWidth={true}
                        error={errors.email !== undefined}
                        helperText={errors.email?.message}
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default ContactInfoForm;
