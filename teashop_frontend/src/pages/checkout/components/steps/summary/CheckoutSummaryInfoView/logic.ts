import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";

const useLogic = () => {
    const contactInfoFormData = useSelector(
        (state: RootState) => state.order.orderFormData.contactInfoFormData
    );
    const shippingAddressFormData = useSelector(
        (state: RootState) => state.order.orderFormData.shippingAddressFormData
    );
    const chosenShippingMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenShippingMethodName
    );
    const chosenPaymentMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenPaymentMethodName
    );
    const countries = useSelector(
        (state: RootState) => state.order.orderMeta.countries
    );
    const shippingMethods = useSelector(
        (state: RootState) => state.order.orderMeta.shippingMethods
    );
    const paymentMethods = useSelector(
        (state: RootState) => state.order.orderMeta.paymentMethods
    );

    const countryCode = shippingAddressFormData.countryCode;

    const countryName = useMemo(() => {
        const country = countries.find(c => c.code === countryCode);
        return country ? country.name : "";
    }, [countryCode, countries]);

    const shippingMethodDisplayName = useMemo(() => {
        const method = shippingMethods.find(
            m => m.name === chosenShippingMethodName
        );
        return method ? method.displayName : "";
    }, [chosenShippingMethodName, shippingMethods]);

    const paymentMethodDisplayName = useMemo(() => {
        const method = paymentMethods.find(
            m => m.name === chosenPaymentMethodName
        );
        return method ? method.displayName : "";
    }, [chosenPaymentMethodName, paymentMethods]);

    const contactInfo = {
        email: contactInfoFormData.email,
    };
    const shippingAddress = {
        firstName: shippingAddressFormData.firstName,
        lastName: shippingAddressFormData.lastName,
        company: shippingAddressFormData.company,
        addressLine1: shippingAddressFormData.addressLine1,
        addressLine2: shippingAddressFormData.addressLine2,
        postalCode: shippingAddressFormData.postalCode,
        city: shippingAddressFormData.city,
        countryName: countryName,
        phone: shippingAddressFormData.phone,
    };

    return {
        contactInfo,
        shippingAddress,
        shippingMethodDisplayName,
        paymentMethodDisplayName,
    };
};

export default useLogic;
