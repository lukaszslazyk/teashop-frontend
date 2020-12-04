import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import {
    ContactInfo,
    PaymentMethod,
    Address,
    ShippingMethod,
} from "../../../../domain/order/models";

interface Props {
    contactInfo: ContactInfo;
    shippingAddress: Address;
    chosenShippingMethod: ShippingMethod;
    chosenPaymentMethod: PaymentMethod;
}

const OrderSummaryInfoView = (props: Props) => {
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
                            {props.contactInfo.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.shippingAddress.firstName}{" "}
                            {props.shippingAddress.lastName}
                        </Typography>
                    </Grid>
                    {!isEmptyOrNull(props.shippingAddress.company) && (
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {props.shippingAddress.company}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.shippingAddress.addressLine1}
                        </Typography>
                    </Grid>
                    {!isEmptyOrNull(props.shippingAddress.addressLine2) && (
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {props.shippingAddress.addressLine2}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.shippingAddress.postalCode},{" "}
                            {props.shippingAddress.city}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.shippingAddress.country}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {props.shippingAddress.phone}
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
                        Shipping method: {props.chosenShippingMethod.displayName}
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
                        Payment method: {props.chosenPaymentMethod.displayName}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderSummaryInfoView;
