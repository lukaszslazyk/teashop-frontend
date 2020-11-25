import { Box, Divider, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";

const ContactInfoForm = () => (
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
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth={true}
                />
            </Grid>
        </Grid>
    </form>
);

export default ContactInfoForm;
