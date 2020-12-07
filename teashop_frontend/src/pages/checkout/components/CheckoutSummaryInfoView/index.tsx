import React, { useMemo } from "react";
import OrderInfoView from "../../../../domain/order/components/OrderInfoView";
import {
    AddressFormData,
    ContactInfoFormData,
    Country,
    PaymentMethod,
    ShippingMethod,
} from "../../../../domain/order/models";

interface Props {
    contactInfoFormData: ContactInfoFormData;
    shippingAddressFormData: AddressFormData;
    chosenShippingMethodName: string;
    chosenPaymentMethodName: string;
    countries: Country[];
    shippingMethods: ShippingMethod[];
    paymentMethods: PaymentMethod[];
}

const CheckoutSummaryInfoView = (props: Props) => {
    const {
        countries,
        shippingMethods,
        paymentMethods,
        chosenShippingMethodName,
        chosenPaymentMethodName,
    } = props;
    const countryCode = props.shippingAddressFormData.countryCode;

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
        email: props.contactInfoFormData.email,
    };
    const shippingAddress = {
        firstName: props.shippingAddressFormData.firstName,
        lastName: props.shippingAddressFormData.lastName,
        company: props.shippingAddressFormData.company,
        addressLine1: props.shippingAddressFormData.addressLine1,
        addressLine2: props.shippingAddressFormData.addressLine2,
        postalCode: props.shippingAddressFormData.postalCode,
        city: props.shippingAddressFormData.city,
        countryName: countryName,
        phone: props.shippingAddressFormData.phone,
    };

    return (
        <OrderInfoView
            contactInfo={contactInfo}
            shippingAddress={shippingAddress}
            chosenShippingMethodName={shippingMethodDisplayName}
            chosenPaymentMethodName={paymentMethodDisplayName}
        />
    );
};

export default CheckoutSummaryInfoView;
