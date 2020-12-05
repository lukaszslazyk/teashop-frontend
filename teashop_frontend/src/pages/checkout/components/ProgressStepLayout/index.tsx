import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Grid,
    Hidden,
    Paper,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { ReactNode } from "react";
import PriceInfoPanelContainer from "../PriceInfoPanel/container";
import useStyles from "./styles";

interface Props {
    totalPrice: number;
    children: ReactNode;
}

const ProgressStepLayout = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Hidden mdUp>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body1">
                                Total price:
                            </Typography>
                            <Box ml={2}>
                                <Typography variant="body1">
                                    {props.totalPrice.toFixed(2)} EUR
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PriceInfoPanelContainer />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Hidden>
            <Grid item md={8} xs={12}>
                {props.children}
            </Grid>
            <Hidden smDown>
                <Grid item md={4}>
                    <Grid container>
                        <Paper className={classes.priceInfoPaper}>
                            <PriceInfoPanelContainer />
                        </Paper>
                    </Grid>
                </Grid>
            </Hidden>
        </Grid>
    );
};

export default ProgressStepLayout;
