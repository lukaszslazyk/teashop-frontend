import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import {
    setContactInfoFormData,
    setShippingAddressFormData,
} from "../../../../../../domain/order/actions";
import {
    AddressFormData,
    ContactInfoFormData,
} from "../../../../../../domain/order/models";

const useLogic = (
    onContinueButtonClick: () => void,
    onBackButtonClick: () => void
) => {
    const contactInfoFormData = useSelector(
        (state: RootState) => state.order.orderFormData.contactInfoFormData
    );
    const shippingAddressFormData = useSelector(
        (state: RootState) => state.order.orderFormData.shippingAddressFormData
    );
    const dispatch = useDispatch();
    const [contactInfoFormValid, setContactInfoFormValid] = useState(false);
    const [shippingAddressFormValid, setShippingAddressFormValid] = useState(false);
    const contactInfoFormMethods = useForm<ContactInfoFormData>({
        defaultValues: contactInfoFormData,
    });
    const shippingAddressFormMethods = useForm<AddressFormData>({
        defaultValues: shippingAddressFormData,
    });

    useEffect(() => {
        if (contactInfoFormValid && shippingAddressFormValid)
            onContinueButtonClick();
    }, [contactInfoFormValid, shippingAddressFormValid, onContinueButtonClick]);

    const handleContinueButtonClicked = () => {
        setContactInfoFormValid(false);
        setShippingAddressFormValid(false);
        contactInfoFormMethods.handleSubmit(onContactInfoFormSubmit)();
        shippingAddressFormMethods.handleSubmit(onShippingAddressFormSubmit)();
    };

    const handleBackButtonClicked = () => onBackButtonClick;

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

    return {
        contactInfoFormMethods,
        shippingAddressFormMethods,
        handleContinueButtonClicked,
        handleBackButtonClicked,
    };
};

export default useLogic;
