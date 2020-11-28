import {
    OrderActionTypes,
    SET_CONTACT_INFO,
    VALIDATE_CONTACT_INFO_FORM,
    SET_CONTACT_INFO_FORM_VALID,
    SET_SHIPPING_ADDRESS,
    VALIDATE_SHIPPING_ADDRESS_FORM,
    SET_SHIPPING_ADDRESS_FORM_VALID,
} from "./actions";
import { ContactInfo, ShippingAddress } from "./models";

export interface OrderState {
    contactInfo: ContactInfo;
    contactInfoForm: ContactInfoFormState;
    shippingAddress: ShippingAddress;
    shippingAddressForm: ShippingAddressFormState;
}

interface ContactInfoFormState {
    shouldValidate: boolean;
    wasValidated: boolean;
    valid: boolean;
}

interface ShippingAddressFormState {
    shouldValidate: boolean;
    wasValidated: boolean;
    valid: boolean;
}

const initialState: OrderState = {
    contactInfo: {
        email: "",
    },
    shippingAddress: {
        firstName: "",
        lastName: "",
        company: "",
        address1: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
    },
    contactInfoForm: {
        shouldValidate: false,
        wasValidated: false,
        valid: false,
    },
    shippingAddressForm: {
        shouldValidate: false,
        wasValidated: false,
        valid: false,
    },
};

export const orderReducer = (
    state = initialState,
    action: OrderActionTypes
): OrderState => {
    switch (action.type) {
        case SET_CONTACT_INFO:
            return {
                ...state,
                contactInfo: action.value,
            };
        case SET_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.value,
            };
        case VALIDATE_CONTACT_INFO_FORM:
            if (state.contactInfoForm.shouldValidate)
                return state;
            return {
                ...state,
                contactInfoForm: {
                    ...state.contactInfoForm,
                    shouldValidate: true,
                },
            };
        case VALIDATE_SHIPPING_ADDRESS_FORM:
            if (state.shippingAddressForm.shouldValidate)
                return state;
            return {
                ...state,
                shippingAddressForm: {
                    ...state.contactInfoForm,
                    shouldValidate: true,
                },
            };
        case SET_CONTACT_INFO_FORM_VALID:
            return {
                ...state,
                contactInfoForm: {
                    ...state.contactInfoForm,
                    wasValidated: true,
                    valid: action.value,
                },
            };
        case SET_SHIPPING_ADDRESS_FORM_VALID:
            return {
                ...state,
                shippingAddressForm: {
                    ...state.shippingAddressForm,
                    wasValidated: true,
                    valid: action.value,
                },
            };
        default:
            return state;
    }
};
