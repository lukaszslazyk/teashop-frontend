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

export interface ShippingMethod {
    name: string;
    price: number;
}

export interface PaymentMethod {
    name: string;
}

export interface CreditCard {
    number: string;
    nameOnCard: string;
    expirationDate: string;
    securityCode: string;
}
