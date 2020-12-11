import React from "react";
import OrderInfoView from "../../../../../../domain/order/components/OrderInfoView";
import useLogic from "./logic";

const CheckoutSummaryInfoView = () => {
    const {
        contactInfo,
        shippingAddress,
        shippingMethodDisplayName,
        paymentMethodDisplayName,
    } = useLogic();

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
