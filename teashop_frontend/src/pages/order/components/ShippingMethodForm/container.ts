import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { setChosenShippingMethod } from "../../../../domain/order/actions";
import ShippingMethodForm from ".";

const mapStateToProps = (state: RootState) => ({
    shippingMethods: state.order.shippingMethods,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setChosenShippingMethod: (shippingMethodName: string) =>
        dispatch(setChosenShippingMethod(shippingMethodName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingMethodForm);
