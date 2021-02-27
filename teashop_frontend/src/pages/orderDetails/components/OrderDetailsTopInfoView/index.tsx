import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    placementDate: Date;
}

const mapToText = (placementDate: Date) =>
    placementDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

const OrderDetailsTopInfoView = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.paperWrapper}>
                <Typography className={classes.placementDateText}>
                    Placement date: {mapToText(props.placementDate)}
                </Typography>
            </Paper>
        </Grid>
    );
};

export default OrderDetailsTopInfoView;
