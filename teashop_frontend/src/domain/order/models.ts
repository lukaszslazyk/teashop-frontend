import { Cart } from "../cart/models";

export interface Order {
    contactInfo: ContactInfo;
    shippingAddress: Address;
    chosenShippingMethod: ShippingMethod;
    chosenPaymentMethod: PaymentMethod;
    cart: Cart;
    totalPrice: number;
    shippingPrice: number;
}

export interface ContactInfo {
    email: string;
}

export interface Address {
    firstName: string;
    lastName: string;
    company: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    country: Country;
    phone: string;
}

export interface OrderMeta {
    countries: Country[];
    shippingMethods: ShippingMethod[];
    paymentMethods: PaymentMethod[];
}

export interface Country {
    code: string;
    name: string;
}

export interface ShippingMethod {
    name: string;
    displayName: string;
    price: number;
}

export interface PaymentMethod {
    name: string;
    displayName: string;
}

export interface OrderFormData {
    contactInfoFormData: ContactInfoFormData;
    shippingAddressFormData: AddressFormData;
    chosenShippingMethodName: string;
    chosenPaymentMethodName: string
    paymentCardFormData: PaymentCardFormData;
}

export interface ContactInfoFormData {
    email: string;
}

export interface AddressFormData {
    firstName: string;
    lastName: string;
    company: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    countryCode: string;
    phone: string;
}

export interface PaymentCardFormData {
    number: string;
    name: string;
    expirationDate: string;
    securityCode: string;
}
