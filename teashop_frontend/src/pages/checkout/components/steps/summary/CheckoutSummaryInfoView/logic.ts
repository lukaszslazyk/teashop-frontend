import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import {
    AddressFormData,
    Country,
    PaymentMethod,
    ShippingMethod,
} from "../../../../../../domain/order/models";

const findNameOfCountryWithCode = (
    code: string,
    countries: Country[]
): string => {
    const country = countries.find(c => c.code === code);
    return country ? country.name : "";
};

const mapToAddressProps = (
    addressFormData: AddressFormData,
    countries: Country[]
) => ({
    firstName: addressFormData.firstName,
    lastName: addressFormData.lastName,
    company: addressFormData.company,
    addressLine1: addressFormData.addressLine1,
    addressLine2: addressFormData.addressLine2,
    postalCode: addressFormData.postalCode,
    city: addressFormData.city,
    countryName: findNameOfCountryWithCode(
        addressFormData.countryCode,
        countries
    ),
    phone: addressFormData.phone,
});

const getDisplayNameForShippingMethodWithName = (
    shippingMethodName: string,
    shippingMethods: ShippingMethod[]
): string => {
    const method = shippingMethods.find(m => m.name === shippingMethodName);
    return method ? method.displayName : "";
};

const getDisplayNameForPaymentMethodWithName = (
    paymentMethodName: string,
    paymentMethods: PaymentMethod[]
): string => {
    const method = paymentMethods.find(m => m.name === paymentMethodName);
    return method ? method.displayName : "";
};

const useLogic = () => {
    const contactInfoFormData = useSelector(
        (state: RootState) => state.order.orderFormData.contactInfoFormData
    );
    const shippingAddressFormData = useSelector(
        (state: RootState) => state.order.orderFormData.shippingAddressFormData
    );
    const billingAddressFormData = useSelector(
        (state: RootState) => state.order.orderFormData.shippingAddressFormData
    );
    const billingAddressSameAsShippingAddress = useSelector(
        (state: RootState) =>
            state.order.orderFormData.billingAddressSameAsShippingAddress
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

    const contactInfoProps = {
        email: contactInfoFormData.email,
    };

    const shippingAddressProps = mapToAddressProps(
        shippingAddressFormData,
        countries
    );
    const billingAddressProps = billingAddressSameAsShippingAddress
        ? shippingAddressProps
        : mapToAddressProps(billingAddressFormData, countries);

    const shippingMethodDisplayName = getDisplayNameForShippingMethodWithName(
        chosenShippingMethodName,
        shippingMethods
    );

    const paymentMethodDisplayName = getDisplayNameForPaymentMethodWithName(
        chosenPaymentMethodName,
        paymentMethods
    );

    return {
        contactInfoProps,
        shippingAddressProps,
        billingAddressProps,
        shippingMethodDisplayName,
        paymentMethodDisplayName,
    };
};

export default useLogic;
