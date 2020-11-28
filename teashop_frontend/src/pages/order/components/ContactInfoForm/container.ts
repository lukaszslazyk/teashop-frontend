import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    setContactInfo,
    setContactInfoFormValid,
} from "../../../../domain/order/actions";
import { ContactInfo } from "../../../../domain/order/models";
import ContactInfoForm from ".";

const mapStateToProps = (state: RootState) => ({
    shouldValidate: state.order.contactInfoForm.shouldValidate,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setContactInfo: (value: ContactInfo) => dispatch(setContactInfo(value)),
    setFormValid: (value: boolean) => dispatch(setContactInfoFormValid(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfoForm);
