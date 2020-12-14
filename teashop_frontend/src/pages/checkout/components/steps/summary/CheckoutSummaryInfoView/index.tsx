import React from "react";
import OrderInfoView from "../../../../../../domain/order/components/OrderInfoView";
import useLogic from "./logic";

const CheckoutSummaryInfoView = () => {
    const {
        contactInfoProps,
        shippingAddressProps,
        billingAddressProps,
        shippingMethodDisplayName,
        paymentMethodDisplayName,
    } = useLogic();

    return (
        <OrderInfoView
            contactInfo={contactInfoProps}
            shippingAddress={shippingAddressProps}
            billingAddress={billingAddressProps}
            chosenShippingMethodName={shippingMethodDisplayName}
            chosenPaymentMethodName={paymentMethodDisplayName}
        />
    );
};

export default CheckoutSummaryInfoView;
