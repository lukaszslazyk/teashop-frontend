import {
    OrderActionTypes,
    SET_CONTACT_INFO,
    VALIDATE_CONTACT_INFO_FORM,
    SET_CONTACT_INFO_FORM_VALID,
    SET_SHIPPING_ADDRESS,
    VALIDATE_SHIPPING_ADDRESS_FORM,
    SET_SHIPPING_ADDRESS_FORM_VALID,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    VALIDATE_CREDIT_CARD_FORM,
    SET_CREDIT_CARD,
    SET_CREDIT_CARD_FORM_VALID,
} from "./actions";
import {
    ContactInfo,
    CreditCard,
    PaymentMethod,
    ShippingAddress,
    ShippingMethod,
} from "./models";

export interface OrderState {
    shippingMethods: ShippingMethod[];
    chosenShippingMethod: ShippingMethod | null;
    paymentMethods: PaymentMethod[];
    chosenPaymentMethod: PaymentMethod | null;
    contactInfo: ContactInfo;
    contactInfoForm: ContactInfoFormState;
    shippingAddress: ShippingAddress;
    shippingAddressForm: ShippingAddressFormState;
    creditCard: CreditCard;
    creditCardForm: CreditCardFormState;
}

interface FormState {
    shouldValidate: boolean;
    wasValidated: boolean;
    valid: boolean;
}

interface ContactInfoFormState extends FormState {}

interface ShippingAddressFormState extends FormState {}

interface CreditCardFormState extends FormState {}

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
    shippingMethods: [
        {
            name: "standard",
            price: 9.99,
        },
    ],
    chosenShippingMethod: null,
    paymentMethods: [
        {
            name: "creditCard",
        },
    ],
    chosenPaymentMethod: null,
    creditCard: {
        number: "",
        nameOnCard: "",
        expirationDate: "",
        securityCode: "",
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
    creditCardForm: {
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
        case SET_CREDIT_CARD:
            return {
                ...state,
                creditCard: action.value,
            };
        case SET_CHOSEN_SHIPPING_METHOD:
            return {
                ...state,
                chosenShippingMethod: findShippingMethodWithName(
                    action.shippingMethodName,
                    state
                ),
            };
        case SET_CHOSEN_PAYMENT_METHOD:
            return {
                ...state,
                chosenPaymentMethod: findPaymentMethodWithName(
                    action.paymentMethodName,
                    state
                ),
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
        case VALIDATE_CREDIT_CARD_FORM:
            if (state.creditCardForm.shouldValidate)
                return state;
            return {
                ...state,
                creditCardForm: {
                    ...state.creditCardForm,
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
        case SET_CREDIT_CARD_FORM_VALID:
            return {
                ...state,
                creditCardForm: {
                    ...state.creditCardForm,
                    wasValidated: true,
                    valid: action.value,
                },
            };
        default:
            return state;
    }
};

const findShippingMethodWithName = (
    name: string,
    state: OrderState
): ShippingMethod | null => {
    const found = state.shippingMethods.find(method => method.name === name);
    return found ? found : null;
};

const findPaymentMethodWithName = (
    name: string,
    state: OrderState
): PaymentMethod | null => {
    const found = state.paymentMethods.find(method => method.name === name);
    return found ? found : null;
};
