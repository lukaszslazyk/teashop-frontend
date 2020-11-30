import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    setShippingAddress,
    setShippingAddressFormValid,
} from "../../../../domain/order/actions";
import { ShippingAddress } from "../../../../domain/order/models";
import ShippingAddressForm from ".";

const mapStateToProps = (state: RootState) => ({
    availableCountries: state.order.availableCountries,
    shippingAddress: state.order.shippingAddress,
    shouldValidate: state.order.shippingAddressForm.shouldValidate,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setShippingAddress: (value: ShippingAddress) =>
        dispatch(setShippingAddress(value)),
    setFormValid: (value: boolean) =>
        dispatch(setShippingAddressFormValid(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingAddressForm);
