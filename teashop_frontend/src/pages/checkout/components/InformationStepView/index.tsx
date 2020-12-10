import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    setContactInfoFormData,
    setShippingAddressFormData,
} from "../../../../domain/order/actions";
import {
    AddressFormData,
    ContactInfoFormData,
} from "../../../../domain/order/models";
import ContactInfoForm from "../ContactInfoForm";
import NavButtonsPanel from "../NavButtonsPanel";
import ShippingAddressForm from "../ShippingAddressForm";

interface Props {
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const InformationStepView = (props: Props) => {
    const contactInfoFormData = useSelector(
        (state: RootState) => state.order.orderFormData.contactInfoFormData
    );
    const shippingAddressFormData = useSelector(
        (state: RootState) => state.order.orderFormData.shippingAddressFormData
    );
    const dispatch = useDispatch();
    const [contactInfoFormValid, setContactInfoFormValid] = useState(false);
    const [shippingAddressFormValid, setShippingAddressFormValid] = useState(
        false
    );
    const { onContinueButtonClick } = props;

    const contactInfoFormMethods = useForm<ContactInfoFormData>({
        defaultValues: contactInfoFormData,
    });
    const shippingAddressFormMethods = useForm<AddressFormData>({
        defaultValues: shippingAddressFormData,
    });

    const handleContinueButtonClick = () => {
        setContactInfoFormValid(false);
        setShippingAddressFormValid(false);
        contactInfoFormMethods.handleSubmit(onContactInfoFormSubmit)();
        shippingAddressFormMethods.handleSubmit(onShippingAddressFormSubmit)();
    };

    const onContactInfoFormSubmit = () => {
        dispatch(setContactInfoFormData(contactInfoFormMethods.getValues()));
        setContactInfoFormValid(true);
    };

    const onShippingAddressFormSubmit = () => {
        dispatch(
            setShippingAddressFormData(shippingAddressFormMethods.getValues())
        );
        setShippingAddressFormValid(true);
    };

    useEffect(() => {
        if (contactInfoFormValid && shippingAddressFormValid)
            onContinueButtonClick();
    }, [contactInfoFormValid, shippingAddressFormValid, onContinueButtonClick]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <FormProvider {...contactInfoFormMethods}>
                    <ContactInfoForm />
                </FormProvider>
            </Grid>
            <Grid item xs={12}>
                <FormProvider {...shippingAddressFormMethods}>
                    <ShippingAddressForm />
                </FormProvider>
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
