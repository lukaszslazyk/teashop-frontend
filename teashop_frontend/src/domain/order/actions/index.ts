import {
    BillingAddressFormActionTypes,
    SET_BILLING_ADDRESS_FORM_DATA,
    setBillingAddressFormData,
} from "./billingAddressForm";
import {
    CheckoutActionTypes,
    INCREMENT_CHECKOUT_STEP,
    DECREMENT_CHECKOUT_STEP,
    CLOSE_CHECKOUT,
    incrementCheckoutStep,
    decrementCheckoutStep,
    closeCheckout,
} from "./checkout";
import {
    ContactInfoFormActionTypes,
    SET_CONTACT_INFO_FORM_DATA,
    setContactInfoFormData,
} from "./contactInfo";
import {
    FetchOrderActionTypes,
    REQUEST_ORDER,
    RECEIVE_ORDER,
    fetchOrder,
} from "./fetchOrder";
import {
    OrderMetaActionTypes,
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    fetchOrderMeta,
} from "./fetchOrderMeta";
import {
    OrderFormActionTypes,
    SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS,
    REQUEST_PLACE_ORDER,
    RECEIVE_PLACE_ORDER,
    setShippingAddressSameAsBillingAddress,
    placeOrder,
} from "./orderForm";
import {
    PaymentCardFormActionTypes,
    SET_PAYMENT_CARD_FORM_DATA,
    setPaymentCardFormData,
} from "./paymentCardForm";
import {
    PaymentMethodFormActionTypes,
    SET_CHOSEN_PAYMENT_METHOD,
    setChosenPaymentMethod,
} from "./paymentMethodForm";
import {
    PriceActionTypes,
    SET_CART_PRICE,
    SET_SHIPPING_FEE,
    SET_PAYMENT_FEE,
    setCartPrice,
    setShippingFee,
    setPaymentFee,
} from "./price";
import {
    ShippingAddressFormActionTypes,
    SET_SHIPPING_ADDRESS_FORM_DATA,
    setShippingAddressFormData,
} from "./shippingAddressForm";
import {
    ShippingMethodFormActionTypes,
    SET_CHOSEN_SHIPPING_METHOD,
    setChosenShippingMethod,
} from "./shippingMethodForm";

export {
    fetchOrder,
    fetchOrderMeta,
    setShippingAddressSameAsBillingAddress,
    placeOrder,
    setContactInfoFormData,
    setShippingAddressFormData,
    setBillingAddressFormData,
    setChosenShippingMethod,
    setChosenPaymentMethod,
    setPaymentCardFormData,
    setCartPrice,
    setShippingFee,
    setPaymentFee,
    incrementCheckoutStep,
    decrementCheckoutStep,
    closeCheckout,
};

export {
    REQUEST_ORDER,
    RECEIVE_ORDER,
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS,
    REQUEST_PLACE_ORDER,
    RECEIVE_PLACE_ORDER,
    SET_CONTACT_INFO_FORM_DATA,
    SET_SHIPPING_ADDRESS_FORM_DATA,
    SET_BILLING_ADDRESS_FORM_DATA,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    SET_PAYMENT_CARD_FORM_DATA,
    SET_CART_PRICE,
    SET_SHIPPING_FEE,
    SET_PAYMENT_FEE,
    INCREMENT_CHECKOUT_STEP,
    DECREMENT_CHECKOUT_STEP,
    CLOSE_CHECKOUT,
};

export type OrderActionTypes =
    | FetchOrderActionTypes
    | OrderMetaActionTypes
    | OrderFormActionTypes
    | ContactInfoFormActionTypes
    | ShippingMethodFormActionTypes
    | ShippingAddressFormActionTypes
    | BillingAddressFormActionTypes
    | PaymentMethodFormActionTypes
    | PaymentCardFormActionTypes
    | PriceActionTypes
    | CheckoutActionTypes;
