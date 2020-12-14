import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import OrderInfoAddressView from "../OrderInfoAddressView";

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

const OrderInfoView = (props: Props) => {
    const shippingAndBillingAddressesTheSame = () =>
        JSON.stringify(props.shippingAddress) === JSON.stringify(props.billingAddress);

    const OrderInfoAddressViewComponent = (addressProps: AddressProps) => (
        <OrderInfoAddressView
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

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} container>
                <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                        Information
                    </Typography>
                    <Box mb={1}>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.contactInfo.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {!shippingAndBillingAddressesTheSame() && (
                            <Typography variant="body1">
                                Shipping address:
                            </Typography>
                        )}
                        {OrderInfoAddressViewComponent(props.shippingAddress)}
                    </Grid>
                    {!shippingAndBillingAddressesTheSame() && (
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Billing address:
                            </Typography>
                            {OrderInfoAddressViewComponent(props.billingAddress)}
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                        Shipping
                    </Typography>
                    <Box mb={1}>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12} container>
                    <Typography variant="body1">
                        Shipping method: {props.chosenPaymentMethodName}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                        Payment
                    </Typography>
                    <Box mb={1}>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12} container>
                    <Typography variant="body1">
                        Payment method: {props.chosenPaymentMethodName}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderInfoView;
