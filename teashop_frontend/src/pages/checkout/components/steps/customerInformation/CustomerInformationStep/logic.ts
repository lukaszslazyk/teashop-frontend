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

const scrollToTop = () =>
    window.scrollTo({
        top: 0,
    });

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
    const contactInfoFormMethods = useForm<ContactInfoFormData>({
        defaultValues: contactInfoFormData,
    });
    const shippingAddressFormMethods = useForm<AddressFormData>({
        defaultValues: shippingAddressFormData,
    });
    const billingAddressFormMethods = useForm<AddressFormData>({
        defaultValues: billingAddressFormData,
    });

    const handleContinueButtonClicked = () => processFormsSubmitionPipeline();

    const handleBackButtonClicked = () => onBackButtonClick();

    const processFormsSubmitionPipeline = () => handleContactInfoFormSubmit();

    const handleContactInfoFormSubmit = () =>
        contactInfoFormMethods
            .handleSubmit(onContactInfoFormSubmit, onFormError)()
            .then(() => handleShippingAddressFormSubmit(true))
            .catch(() => handleShippingAddressFormSubmit(false));

    const handleShippingAddressFormSubmit = (prevValid: boolean) =>
        shippingAddressFormMethods
            .handleSubmit(onShippingAddressFormSubmit, onFormError)()
            .then(() => handleBillingAddressFormSubmit(prevValid))
            .catch(() => handleBillingAddressFormSubmit(false));

    const handleBillingAddressFormSubmit = (prevValid: boolean) => {
        if (billingAddressSameAsShippingAddress)
            finalizeFormsSubmitionPipeline(prevValid);
        else
            billingAddressFormMethods
                .handleSubmit(onBillingAddressFormSubmit, onFormError)()
                .then(() => finalizeFormsSubmitionPipeline(prevValid))
                .catch(() => finalizeFormsSubmitionPipeline(false));
    };

    const finalizeFormsSubmitionPipeline = (allFormsValid: boolean) => {
        if (allFormsValid)
            onContinueButtonClick();
        else
            scrollToTop();
    };

    const onContactInfoFormSubmit = () =>
        dispatch(setContactInfoFormData(contactInfoFormMethods.getValues()));

    const onShippingAddressFormSubmit = () =>
        dispatch(
            setShippingAddressFormData(shippingAddressFormMethods.getValues())
        );

    const onBillingAddressFormSubmit = () =>
        dispatch(
            setBillingAddressFormData(billingAddressFormMethods.getValues())
        );

    const onFormError = () => {
        throw new Error();
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
