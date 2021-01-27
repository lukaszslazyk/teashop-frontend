import React from "react";
import OrderCustomerProvidedInfoView from "../../../../../../domain/order/components/OrderCustomerProvidedInfoView";
import useLogic from "./logic";

const CheckoutSummaryCustomerProvidedInfoView = () => {
    const {
        contactInfoProps,
        shippingAddressProps,
        billingAddressProps,
        shippingMethodDisplayName,
        paymentMethodDisplayName,
    } = useLogic();

    return (
        <OrderCustomerProvidedInfoView
            contactInfo={contactInfoProps}
            shippingAddress={shippingAddressProps}
            billingAddress={billingAddressProps}
            chosenShippingMethodName={shippingMethodDisplayName}
            chosenPaymentMethodName={paymentMethodDisplayName}
        />
    );
};

export default CheckoutSummaryCustomerProvidedInfoView;
