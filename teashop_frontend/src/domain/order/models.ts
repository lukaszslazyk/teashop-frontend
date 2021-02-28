import { Product } from "../product/models";

export interface Order {
    orderNumber: number;
    placementDate: Date;
    contactInfo: ContactInfo;
    shippingAddress: Address;
    billingAddress: Address;
    chosenShippingMethod: ShippingMethod;
    chosenPaymentMethod: PaymentMethod;
    orderLines: OrderLine[];
    totalPrice: number;
    shippingFee: number;
    paymentFee: number;
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

export interface OrderLine {
    product: Product;
    quantity: number;
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
    fee: number;
}

export interface PaymentMethod {
    name: string;
    displayName: string;
    fee: number;
}

export interface OrderFormData {
    contactInfoFormData: ContactInfoFormData;
    shippingAddressFormData: AddressFormData;
    billingAddressFormData: AddressFormData;
    billingAddressSameAsShippingAddress: boolean;
    chosenShippingMethodName: string;
    chosenPaymentMethodName: string;
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

export enum CheckoutSteps {
    Information,
    Shipping,
    Payment,
    Summary,
    Finalize,
}
