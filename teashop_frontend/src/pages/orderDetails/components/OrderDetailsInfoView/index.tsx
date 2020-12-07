import React from "react";
import OrderInfoView from "../../../../domain/order/components/OrderInfoView";
import { Order } from "../../../../domain/order/models";

interface Props {
    order: Order;
}

const OrderDetailsInfoView = (props: Props) => {
    const contactInfo = {
        email: props.order.contactInfo.email,
    };
    const shippingAddress = {
        firstName: props.order.shippingAddress.firstName,
        lastName: props.order.shippingAddress.lastName,
        company: props.order.shippingAddress.company,
        addressLine1: props.order.shippingAddress.addressLine1,
        addressLine2: props.order.shippingAddress.addressLine2,
        postalCode: props.order.shippingAddress.postalCode,
        city: props.order.shippingAddress.city,
        countryName: props.order.shippingAddress.country.name,
        phone: props.order.shippingAddress.phone,
    };

    return (
        <OrderInfoView
            contactInfo={contactInfo}
            shippingAddress={shippingAddress}
            chosenShippingMethodName={
                props.order.chosenShippingMethod.displayName
            }
            chosenPaymentMethodName={
                props.order.chosenPaymentMethod.displayName
            }
        />
    );
};

export default OrderDetailsInfoView;
