import { Grid, Typography } from "@material-ui/core";
import React from "react";

export interface Props {
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

const OrderInfoAddressView = (props: Props) => {
    const isEmptyOrNull = (input: string | null): boolean =>
        input === null || input.trim().length === 0;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="body1">
                    {props.firstName}{" "}
                    {props.lastName}
                </Typography>
            </Grid>
            {!isEmptyOrNull(props.company) && (
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {props.company}
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                <Typography variant="body1">
                    {props.addressLine1}
                </Typography>
            </Grid>
            {!isEmptyOrNull(
                props.addressLine2
            ) && (
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {props.addressLine2}
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                <Typography variant="body1">
                    {props.postalCode},{" "}
                    {props.city}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">{props.countryName}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    {props.phone}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default OrderInfoAddressView;
