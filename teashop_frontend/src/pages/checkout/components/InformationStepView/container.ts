import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    setContactInfoFormData,
    setShippingAddressFormData,
} from "../../../../domain/order/actions";
import {
    AddressFormData,
    ContactInfoFormData,
} from "../../../../domain/order/models";
import InformationStepView from ".";

const mapStateToProps = (state: RootState) => ({
    contactInfoFormData: state.order.orderFormData.contactInfoFormData,
    shippingAddressFormData: state.order.orderFormData.shippingAddressFormData,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setContactInfoFormData: (value: ContactInfoFormData) =>
        dispatch(setContactInfoFormData(value)),
    setShippingAddressFormData: (value: AddressFormData) =>
        dispatch(setShippingAddressFormData(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InformationStepView);
