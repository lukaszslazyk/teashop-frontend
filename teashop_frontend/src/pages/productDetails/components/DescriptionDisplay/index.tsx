import { Box, Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    description: string;
}

const DescriptionDisplay = (props: Props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" color="primary">
                Description
            </Typography>
            <Box mt={1} mb={2}>
                <Divider />
            </Box>
            <Typography variant="body1" className={classes.descriptionText}>
                {props.description}
            </Typography>
        </Paper>
    );
};

export default DescriptionDisplay;
