import { Dispatch } from "react";
import { connect } from "react-redux";
import {
    setContactInfo,
    setShippingAddress,
} from "../../../../domain/order/actions";
import { ContactInfo, ShippingAddress } from "../../../../domain/order/models";
import InformationStepView from ".";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";

const mapStateToProps = (state: RootState) => ({
    contactInfo: state.order.contactInfo,
    shippingAddress: state.order.shippingAddress,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setContactInfo: (value: ContactInfo) => dispatch(setContactInfo(value)),
    setShippingAddress: (value: ShippingAddress) =>
        dispatch(setShippingAddress(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InformationStepView);
