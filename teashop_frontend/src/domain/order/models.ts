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

export interface ContactInfo {
    email: string;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
}

export interface CreditCard {
    number: string;
    nameOnCard: string;
    expirationDate: string;
    securityCode: string;
}
