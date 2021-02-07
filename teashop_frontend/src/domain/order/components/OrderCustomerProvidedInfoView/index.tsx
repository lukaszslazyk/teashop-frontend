import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import OrderAddressView from "../OrderAddressView";
import useStyles from "./styles";

interface Props {
    contactInfo: {
        email: string;
    };
    shippingAddress: AddressProps;
    billingAddress: AddressProps;
    chosenShippingMethodName: string;
    chosenPaymentMethodName: string;
}

interface AddressProps {
    firstName: string;
    lastName: string;
    company: string | null;
    addressLine1: string;
    addressLine2: string | null;
    postalCode: string;
    city: string;
    countryName: string;
    phone: string;
}

const getOrderInfoAddressViewComponentWith = (addressProps: AddressProps) => (
    <OrderAddressView
        firstName={addressProps.firstName}
        lastName={addressProps.lastName}
        company={addressProps.company}
        addressLine1={addressProps.addressLine1}
        addressLine2={addressProps.addressLine2}
        postalCode={addressProps.postalCode}
        city={addressProps.city}
        countryName={addressProps.countryName}
        phone={addressProps.phone}
    />
);

const OrderCustomerProvidedInfoView = (props: Props) => {
    const classes = useStyles();

    const areShippingAndBillingAddressesTheSame = () =>
        JSON.stringify(props.shippingAddress) ===
        JSON.stringify(props.billingAddress);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paperWrapper}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="primary">
                            Information
                        </Typography>
                        <Box mb={2}>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Email: {props.contactInfo.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {areShippingAndBillingAddressesTheSame()
                                    ? "Address:"
                                    : "Shipping address:"}
                            </Typography>
                            {getOrderInfoAddressViewComponentWith(
                                props.shippingAddress
                            )}
                        </Grid>
                        {!areShippingAndBillingAddressesTheSame() && (
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    Billing address:
                                </Typography>
                                {getOrderInfoAddressViewComponentWith(
                                    props.billingAddress
                                )}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Shipping method:{" "}
                                {props.chosenShippingMethodName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Payment method: {props.chosenPaymentMethodName}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default OrderCustomerProvidedInfoView;
