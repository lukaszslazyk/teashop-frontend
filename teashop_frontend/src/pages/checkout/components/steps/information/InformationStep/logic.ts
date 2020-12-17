import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import {
    setBillingAddressFormData,
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
    const billingAddressFormData = useSelector(
        (state: RootState) => state.order.orderFormData.billingAddressFormData
    );
    const billingAddressSameAsShippingAddress = useSelector(
        (state: RootState) =>
            state.order.orderFormData.billingAddressSameAsShippingAddress
    );
    const dispatch = useDispatch();
    const [submitInProgress, setSubmitInProgress] = useState(false);
    const [contactInfoFormValid, setContactInfoFormValid] = useState(false);
    const [shippingAddressFormValid, setShippingAddressFormValid] = useState(
        false
    );
    const [billingAddressFormValid, setBillingAddressFormValid] = useState(
        false
    );
    const contactInfoFormMethods = useForm<ContactInfoFormData>({
        defaultValues: contactInfoFormData,
    });
    const shippingAddressFormMethods = useForm<AddressFormData>({
        defaultValues: shippingAddressFormData,
    });
    const billingAddressFormMethods = useForm<AddressFormData>({
        defaultValues: billingAddressFormData,
    });

    const canContinue = useCallback(
        (): boolean =>
            contactInfoFormValid &&
            shippingAddressFormValid &&
            (billingAddressSameAsShippingAddress || billingAddressFormValid),
        [
            contactInfoFormValid,
            shippingAddressFormValid,
            billingAddressFormValid,
            billingAddressSameAsShippingAddress,
        ]
    );

    useEffect(() => {
        if (submitInProgress && canContinue()) onContinueButtonClick();
    }, [submitInProgress, canContinue, onContinueButtonClick]);

    const handleContinueButtonClicked = () => {
        setupFormsSubmition();
        processFormsSubmitionPipeline();
    };

    const handleBackButtonClicked = () => onBackButtonClick();

    const setupFormsSubmition = () => {
        setContactInfoFormValid(false);
        setShippingAddressFormValid(false);
        setBillingAddressFormValid(false);
        setSubmitInProgress(true);
    };

    const processFormsSubmitionPipeline = () => handleContactInfoFormSubmit();

    const handleContactInfoFormSubmit = () =>
        contactInfoFormMethods
            .handleSubmit(onContactInfoFormSubmit)()
            .then(() => handleShippingAddressFormSubmit());

    const onContactInfoFormSubmit = () => {
        dispatch(setContactInfoFormData(contactInfoFormMethods.getValues()));
        setContactInfoFormValid(true);
    };

    const handleShippingAddressFormSubmit = () =>
        shippingAddressFormMethods
            .handleSubmit(onShippingAddressFormSubmit)()
            .then(() => handleBillingAddressFormSubmit());

    const onShippingAddressFormSubmit = () => {
        dispatch(
            setShippingAddressFormData(shippingAddressFormMethods.getValues())
        );
        setShippingAddressFormValid(true);
    };

    const handleBillingAddressFormSubmit = () => {
        if (!billingAddressSameAsShippingAddress)
            billingAddressFormMethods
                .handleSubmit(onBillingAddressFormSubmit)()
                .then(() => setSubmitInProgress(false));
        else setSubmitInProgress(false);
    };

    const onBillingAddressFormSubmit = () => {
        dispatch(
            setBillingAddressFormData(billingAddressFormMethods.getValues())
        );
        setBillingAddressFormValid(true);
    };

    return {
        contactInfoFormMethods,
        shippingAddressFormMethods,
        billingAddressFormMethods,
        handleContinueButtonClicked,
        handleBackButtonClicked,
    };
};

export default useLogic;
