import { Box, Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import { BrewingInfo } from "../../../../domain/product/models";
import useStyles from "./styles";

interface Props {
    brewingInfo: BrewingInfo;
}

const BrewingInfoDisplay = (props: Props) => {
    const classes = useStyles();

    const nullOrEmpty = (input: string | undefined): boolean =>
        !input || input.trim().length === 0;

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" color="primary">
                Brewing tips
            </Typography>
            <Box mt={1} mb={2}>
                <Divider />
            </Box>
            {!nullOrEmpty(props.brewingInfo.weightInfo) && (
                <Typography variant="body1">
                    Weight per brewing: {props.brewingInfo.weightInfo}
                </Typography>
            )}
            {!nullOrEmpty(props.brewingInfo.temperatureInfo) && (
                <Typography variant="body1">
                    Temperature: {props.brewingInfo.temperatureInfo}
                </Typography>
            )}
            {!nullOrEmpty(props.brewingInfo.timeInfo) && (
                <Typography variant="body1">
                    Time: {props.brewingInfo.timeInfo}
                </Typography>
            )}
            {!nullOrEmpty(props.brewingInfo.numberOfBrewingsInfo) && (
                <Typography variant="body1">
                    Number of brewings: {props.brewingInfo.numberOfBrewingsInfo}
                </Typography>
            )}
        </Paper>
    );
};

export default BrewingInfoDisplay;
