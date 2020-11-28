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
import ContactInfoFormContainer from "./components/ContactInfoForm/container";
import NavButtonsPanel from "./components/NavButtonsPanel";
import PriceInfoPanel from "./components/PriceInfoPanel";
import ShippingAddressFormContainer from "./components/ShippingAddressForm/container";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    contactInfoFormWasValidated: boolean;
    contactInfoFormValid: boolean;
    shippingAddressFormWasValidated: boolean;
    shippingAddressFormValid: boolean;
    validateContactInfoForm: () => void;
    validateShippingAddressForm: () => void;
}

const OrderPage = (props: Props) => {
    const classes = useStyles();
    const { cart } = props;

    const getCartPriceText = useCallback(
        (): string => `${calculateCartPrice(cart).toFixed(2)} EUR`,
        [cart]
    );

    const handleContinueButtonClick = () => {
        props.validateContactInfoForm();
        props.validateShippingAddressForm();
        if (
            props.contactInfoFormWasValidated &&
            props.contactInfoFormValid &&
            props.shippingAddressFormWasValidated &&
            props.shippingAddressFormValid
        )
            console.log("Continue");
    };

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
                            <ContactInfoFormContainer />
                        </Grid>
                        <Grid item xs={12}>
                            <ShippingAddressFormContainer />
                        </Grid>
                        <Grid item xs={12}>
                            <NavButtonsPanel
                                onContinueButtonClick={
                                    handleContinueButtonClick
                                }
                            />
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
