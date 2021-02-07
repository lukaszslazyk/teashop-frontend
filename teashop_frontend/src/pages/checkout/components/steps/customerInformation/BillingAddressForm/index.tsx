import {
    FormControlLabel,
    Grid,
    Paper,
    Switch,
    Typography,
} from "@material-ui/core";
import React from "react";
import AddressForm from "../AddressForm";
import useLogic from "./logic";
import useStyles from "./styles";

const BillingAddressForm = () => {
    const {
        billingAddressSameAsShippingAddress,
        handleCheckboxChange,
    } = useLogic();
    const classes = useStyles();

    return (
        <Paper className={classes.surface}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                        Billing address
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={billingAddressSameAsShippingAddress}
                                onChange={handleCheckboxChange}
                                name="billingAddressSameAsShippingAddress"
                                color="primary"
                            />
                        }
                        label="Same as shipping address"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={
                        billingAddressSameAsShippingAddress
                            ? classes.hidden
                            : classes.billingAddressForm
                    }
                >
                    <AddressForm />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BillingAddressForm;
