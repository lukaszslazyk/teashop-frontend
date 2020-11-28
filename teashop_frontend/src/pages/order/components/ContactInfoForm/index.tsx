import { Box, Divider, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
    email: string;
}

const ContactInfoForm = () => {
    const { register, errors } = useForm<FormData>({
        mode: "onTouched",
    });

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
