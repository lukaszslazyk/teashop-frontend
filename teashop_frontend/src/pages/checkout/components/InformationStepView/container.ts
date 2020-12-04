import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    setContactInfo,
    setShippingAddress,
} from "../../../../domain/order/actions";
import { ContactInfo, Address } from "../../../../domain/order/models";
import InformationStepView from ".";

const mapStateToProps = (state: RootState) => ({
    contactInfo: state.order.createdOrder.contactInfo,
    shippingAddress: state.order.createdOrder.shippingAddress,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setContactInfo: (value: ContactInfo) => dispatch(setContactInfo(value)),
    setShippingAddress: (value: Address) =>
        dispatch(setShippingAddress(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InformationStepView);
