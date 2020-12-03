import { Dispatch } from "react";
import { connect } from "react-redux";
import {
    setContactInfo,
    setShippingAddress,
} from "../../../../domain/order/actions";
import { ContactInfo, ShippingAddress } from "../../../../domain/order/models";
import InformationStepView from ".";

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setContactInfo: (value: ContactInfo) => dispatch(setContactInfo(value)),
    setShippingAddress: (value: ShippingAddress) =>
        dispatch(setShippingAddress(value)),
});

export default connect(null, mapDispatchToProps)(InformationStepView);
