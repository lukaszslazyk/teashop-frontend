import { Grid } from "@material-ui/core";
import React from "react";
import ContactInfoFormContainer from "../../components/ContactInfoForm/container";
import ShippingAddressFormContainer from "../../components/ShippingAddressForm/container";
import NavButtonsPanel from "../NavButtonsPanel";

interface Props {
    contactInfoFormWasValidated: boolean;
    contactInfoFormValid: boolean;
    shippingAddressFormWasValidated: boolean;
    shippingAddressFormValid: boolean;
    validateContactInfoForm: () => void;
    validateShippingAddressForm: () => void;
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const InformationStepView = (props: Props) => {
    const handleContinueButtonClick = () => {
        props.validateContactInfoForm();
        props.validateShippingAddressForm();
        if (
            props.contactInfoFormWasValidated &&
            props.contactInfoFormValid &&
            props.shippingAddressFormWasValidated &&
            props.shippingAddressFormValid
        )
            props.onContinueButtonClick();
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <ContactInfoFormContainer />
            </Grid>
            <Grid item xs={12}>
                <ShippingAddressFormContainer />
            </Grid>
            <Grid item xs={12}>
                <NavButtonsPanel
                    onContinueButtonClick={handleContinueButtonClick}
                    onBackButtonClick={props.onBackButtonClick}
                    backButtonLabel="Back to cart"
                />
            </Grid>
        </Grid>
    );
};

export default InformationStepView;
