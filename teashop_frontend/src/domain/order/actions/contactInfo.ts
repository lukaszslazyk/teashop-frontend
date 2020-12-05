import { ContactInfoFormData } from "../models";

export const SET_CONTACT_INFO_FORM_DATA = "SET_CONTACT_INFO_FORM_DATA";

interface SetContactInfoFormAction {
    type: typeof SET_CONTACT_INFO_FORM_DATA;
    value: ContactInfoFormData;
}

export type ContactInfoFormActionTypes = SetContactInfoFormAction;

export const setContactInfoFormData = (
    value: ContactInfoFormData
): ContactInfoFormActionTypes => ({
    type: SET_CONTACT_INFO_FORM_DATA,
    value: value,
});
