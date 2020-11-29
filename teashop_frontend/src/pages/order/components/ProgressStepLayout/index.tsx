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
import React, { ReactNode, useMemo } from "react";
import { Cart } from "../../../../domain/cart/models";
import { ShippingMethod } from "../../../../domain/order/models";
import { calculateTotalOrderPrice } from "../../../../domain/order/services/orderService";
import PriceInfoPanelContainer from "../PriceInfoPanel/container";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    chosenShippingMethod: ShippingMethod | null,
    children: ReactNode;
}

const ProgressStepLayout = (props: Props) => {
    const classes = useStyles();
    const { cart, chosenShippingMethod } = props;

    const totalPrice = useMemo((): number =>
        calculateTotalOrderPrice(cart, chosenShippingMethod)
    , [cart, chosenShippingMethod]);

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
                                    {totalPrice.toFixed(2)} EUR
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
