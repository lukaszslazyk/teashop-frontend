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
import { useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import PriceInfoPanel from "../PriceInfoPanel";
import useStyles from "./styles";

interface Props {
    children: ReactNode;
}

const CustomerProvidedInfoStepLayout = (props: Props) => {
    const totalPrice = useSelector(
        (state: RootState) => state.order.totalPrice
    );
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
                                    {getPriceTextWithCurrency(totalPrice)}
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PriceInfoPanel />
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
                            <PriceInfoPanel />
                        </Paper>
                    </Grid>
                </Grid>
            </Hidden>
        </Grid>
    );
};

export default CustomerProvidedInfoStepLayout;
