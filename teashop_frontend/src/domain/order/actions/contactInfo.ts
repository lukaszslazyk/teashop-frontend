import { ContactInfo } from "../models";

export const SET_CONTACT_INFO = "SET_CONTACT_INFO";
export const VALIDATE_CONTACT_INFO_FORM = "VALIDATE_CONTACT_INFO_FORM";
export const SET_CONTACT_INFO_FORM_VALID = "SET_CONTACT_INFO_FORM_VALID";

interface SetContactInfoAction {
    type: typeof SET_CONTACT_INFO;
    value: ContactInfo;
}

interface ValidateContactInfoFormAction {
    type: typeof VALIDATE_CONTACT_INFO_FORM;
}

interface SetContactInfoFormValidAction {
    type: typeof SET_CONTACT_INFO_FORM_VALID;
    value: boolean;
}

export type ContactInfoActionTypes =
    | SetContactInfoAction
    | ValidateContactInfoFormAction
    | SetContactInfoFormValidAction;

export const setContactInfo = (value: ContactInfo): ContactInfoActionTypes => ({
    type: SET_CONTACT_INFO,
    value: value,
});

export const validateContactInfoForm = (): ContactInfoActionTypes => ({
    type: VALIDATE_CONTACT_INFO_FORM,
});

export const setContactInfoFormValid = (
    value: boolean
): ContactInfoActionTypes => ({
    type: SET_CONTACT_INFO_FORM_VALID,
    value: value,
});
