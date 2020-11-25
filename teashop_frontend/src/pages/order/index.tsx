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
import React, { useCallback } from "react";
import { Cart } from "../../domain/cart/models";
import { calculateCartPrice } from "../../domain/cart/services/cartService";
import MainLayout from "../../layouts/main";
import ContactInfoForm from "./components/ContactInfoForm";
import NavButtonsPanel from "./components/NavButtonsPanel";
import PriceInfoPanel from "./components/PriceInfoPanel";
import ShippingAddressForm from "./components/ShippingAddressForm";
import useStyles from "./styles";

interface Props {
    cart: Cart;
}

const OrderPage = (props: Props) => {
    const classes = useStyles();
    const { cart } = props;

    const getCartPriceText = useCallback(
        (): string => `${calculateCartPrice(cart).toFixed(2)} EUR`,
        [cart]
    );

    const PriceInfoPanelComponent = () => (
        <PriceInfoPanel cartPrice={calculateCartPrice(cart)} />
    );

    return (
        <MainLayout>
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
                                        {getCartPriceText()}
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                {PriceInfoPanelComponent()}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Hidden>
                <Grid item md={8} xs={12}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <ContactInfoForm />
                        </Grid>
                        <Grid item xs={12}>
                            <ShippingAddressForm />
                        </Grid>
                        <Grid item xs={12}>
                            <NavButtonsPanel />
                        </Grid>
                    </Grid>
                </Grid>
                <Hidden smDown>
                    <Grid item md={4}>
                        <Grid container>
                            <Paper className={classes.priceInfoPaper}>
                                {PriceInfoPanelComponent()}
                            </Paper>
                        </Grid>
                    </Grid>
                </Hidden>
            </Grid>
        </MainLayout>
    );
};

export default OrderPage;
