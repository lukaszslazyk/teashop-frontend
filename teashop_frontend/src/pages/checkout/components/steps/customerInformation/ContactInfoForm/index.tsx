import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";
import useStyles from "./styles";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const ContactInfoForm = () => {
    const { register, errors } = useFormContext();
    const classes = useStyles();

    return (
        <form noValidate>
            <Paper className={classes.surface}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="primary">
                            Contact information
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            inputRef={register({
                                required: "Email is required",
                                pattern: {
                                    value: emailPattern,
                                    message: "Email is incorrect",
                                },
                            })}
                            inputProps={{
                                maxLength: 254,
                            }}
                            label="Email"
                            variant="outlined"
                            fullWidth={true}
                            error={errors.email !== undefined}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
};

export default ContactInfoForm;
