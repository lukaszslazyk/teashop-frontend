import React from "react";
import OrderInfoView from "../../../../domain/order/components/OrderInfoView";
import { Address, Order } from "../../../../domain/order/models";

interface Props {
    order: Order;
}

const mapToAddressProps = (address: Address) => ({
    firstName: address.firstName,
    lastName: address.lastName,
    company: address.company,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
    postalCode: address.postalCode,
    city: address.city,
    countryName: address.country.name,
    phone: address.phone
});

const OrderDetailsInfoView = (props: Props) => {
    const contactInfoProps = {
        email: props.order.contactInfo.email,
    };
    const shippingAddressProps = mapToAddressProps(props.order.shippingAddress);
    const billingAddressProps = mapToAddressProps(props.order.billingAddress);

    return (
        <OrderInfoView
            contactInfo={contactInfoProps}
            shippingAddress={shippingAddressProps}
            billingAddress={billingAddressProps}
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
