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
import { calculateCartPrice } from "../../../../domain/cart/services/cartService";
import PriceInfoPanel from "../PriceInfoPanel";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    children: ReactNode;
}

const ProgressStepLayout = (props: Props) => {
    const classes = useStyles();
    const { cart } = props;

    const cartPrice = useMemo(():number =>
        calculateCartPrice(cart)
    , [cart]);

    const cartPriceText = useMemo((): string =>
        `${cartPrice.toFixed(2)} EUR`
    , [cartPrice]);

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
                                    {cartPriceText}
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PriceInfoPanel cartPrice={cartPrice} />
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
                            <PriceInfoPanel cartPrice={cartPrice} />
                        </Paper>
                    </Grid>
                </Grid>
            </Hidden>
        </Grid>
    );
};

export default ProgressStepLayout;
