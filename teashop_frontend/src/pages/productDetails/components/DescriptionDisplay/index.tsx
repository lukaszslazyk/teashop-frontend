import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    description: string;
}

const DescriptionDisplay = (props: Props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Box mb={1}>
                <Typography variant="h5" color="primary">
                    Description
                </Typography>
            </Box>
            <Typography variant="body1" className={classes.descriptionText}>
                {props.description}
            </Typography>
        </Paper>
    );
};

export default DescriptionDisplay;
