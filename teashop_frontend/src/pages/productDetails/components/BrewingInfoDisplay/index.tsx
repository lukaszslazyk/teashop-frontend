import {
    faThermometerHalf,
    faBalanceScale,
    faClock,
    faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { BrewingInfo } from "../../../../domain/product/models";
import BrewingInfoDisplayLine from "../BrewingInfoDisplayLine";
import useStyles from "./styles";

interface Props {
    brewingInfo: BrewingInfo;
}

const nullOrEmpty = (input: string | undefined): boolean =>
    !input || input.trim().length === 0;

const BrewingInfoDisplay = (props: Props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Box mb={2}>
                <Typography variant="h5" color="primary">
                    Brewing tips
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {!nullOrEmpty(props.brewingInfo.weightInfo) && (
                    <BrewingInfoDisplayLine
                        text={props.brewingInfo.weightInfo}
                        tooltipText="Weight per brewing"
                        faIconDefinition={faBalanceScale}
                    />
                )}
                {!nullOrEmpty(props.brewingInfo.temperatureInfo) && (
                    <BrewingInfoDisplayLine
                        text={props.brewingInfo.temperatureInfo}
                        tooltipText="Temperature"
                        faIconDefinition={faThermometerHalf}
                    />
                )}
                {!nullOrEmpty(props.brewingInfo.timeInfo) && (
                    <BrewingInfoDisplayLine
                        text={props.brewingInfo.timeInfo}
                        tooltipText="Time"
                        faIconDefinition={faClock}
                    />
                )}
                {!nullOrEmpty(props.brewingInfo.numberOfBrewingsInfo) && (
                    <BrewingInfoDisplayLine
                        text={props.brewingInfo.numberOfBrewingsInfo}
                        tooltipText="Number of brewings"
                        faIconDefinition={faCoffee}
                    />
                )}
            </Grid>
        </Paper>
    );
};

export default BrewingInfoDisplay;
