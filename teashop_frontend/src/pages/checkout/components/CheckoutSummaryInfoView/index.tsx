import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import {
    AddressFormData,
    ContactInfoFormData,
    Country,
    PaymentMethod,
    ShippingMethod,
} from "../../../../domain/order/models";

interface Props {
    contactInfoFormData: ContactInfoFormData;
    shippingAddressFormData: AddressFormData;
    chosenShippingMethodName: string;
    chosenPaymentMethodName: string;
    countries: Country[];
    shippingMethods: ShippingMethod[];
    paymentMethods: PaymentMethod[];
}

const CheckoutSummaryInfoView = (props: Props) => {
    const {
        countries,
        shippingMethods,
        paymentMethods,
        chosenShippingMethodName,
        chosenPaymentMethodName,
    } = props;
    const countryCode = props.shippingAddressFormData.countryCode;

    const countryName = useMemo(() => {
        const country = countries.find(c => c.code === countryCode);
        return country?.name;
    }, [countryCode, countries]);

    const shippingMethodDisplayName = useMemo(() => {
        const method = shippingMethods.find(m => m.name === chosenShippingMethodName);
        return method?.displayName;
    }, [chosenShippingMethodName, shippingMethods]);

    const paymentMethodDisplayName = useMemo(() => {
        const method = paymentMethods.find(m => m.name === chosenPaymentMethodName);
        return method?.displayName;
    }, [chosenPaymentMethodName, paymentMethods]);

    const isEmptyOrNull = (input: string | null): boolean =>
        input === null || input.trim().length === 0;

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
                <Grid item xs={12} container>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.contactInfoFormData.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.shippingAddressFormData.firstName}{" "}
                            {props.shippingAddressFormData.lastName}
                        </Typography>
                    </Grid>
                    {!isEmptyOrNull(props.shippingAddressFormData.company) && (
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {props.shippingAddressFormData.company}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.shippingAddressFormData.addressLine1}
                        </Typography>
                    </Grid>
                    {!isEmptyOrNull(
                        props.shippingAddressFormData.addressLine2
                    ) && (
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {props.shippingAddressFormData.addressLine2}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.shippingAddressFormData.postalCode},{" "}
                            {props.shippingAddressFormData.city}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">{countryName}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.shippingAddressFormData.phone}
                        </Typography>
                    </Grid>
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
                        Shipping method: {shippingMethodDisplayName}
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
                        Payment method: {paymentMethodDisplayName}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CheckoutSummaryInfoView;
