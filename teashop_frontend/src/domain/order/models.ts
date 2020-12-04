import { Cart } from "../cart/models";

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

export interface Order {
    id: string;
    contactInfo: ContactInfo;
    shippingAddress: Address;
    chosenShippingMethod: ShippingMethod | null;
    chosenPaymentMethod: PaymentMethod | null;
    paymentCard: PaymentCard | null;
    cart: Cart | null;
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
    country: string;
    phone: string;
}

export interface PaymentCard {
    number: string;
    nameOnCard: string;
    expirationDate: string;
    securityCode: string;
}
