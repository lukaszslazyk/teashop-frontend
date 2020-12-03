import { ContactInfo } from "../models";

export const SET_CONTACT_INFO = "SET_CONTACT_INFO";

interface SetContactInfoAction {
    type: typeof SET_CONTACT_INFO;
    value: ContactInfo;
}

export type ContactInfoActionTypes = SetContactInfoAction;

export const setContactInfo = (value: ContactInfo): ContactInfoActionTypes => ({
    type: SET_CONTACT_INFO,
    value: value,
});
