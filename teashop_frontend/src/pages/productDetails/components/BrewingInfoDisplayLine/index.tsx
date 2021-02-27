import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    text: string;
    tooltipText: string;
    faIconDefinition: IconDefinition;
}

const BrewingInfoDisplayLine = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.lineContainer}>
            <Tooltip
                title={
                    <Typography variant="body1">{props.tooltipText}</Typography>
                }
            >
                <div className={classes.iconContainer}>
                    <FontAwesomeIcon
                        icon={props.faIconDefinition}
                        className={classes.icon}
                    />
                </div>
            </Tooltip>
            <Typography variant="body1" className={classes.text}>{props.text}</Typography>
        </Grid>
    );
};

export default BrewingInfoDisplayLine;
