import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    placementDate: Date;
}

const OrderDetailsTopInfoView = (props: Props) => {
    const classes = useStyles();

    const getPlacementDateText = (): string =>
        props.placementDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <Grid item xs={12}>
            <Paper className={classes.paperWrapper}>
                <Typography className={classes.placementDateText}>
                    Placement date: {getPlacementDateText()}
                </Typography>
            </Paper>
        </Grid>
    );
};

export default OrderDetailsTopInfoView;
