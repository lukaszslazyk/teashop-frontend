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
