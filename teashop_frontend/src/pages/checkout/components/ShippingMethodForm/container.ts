import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    setChosenShippingMethod,
    setShippingPrice,
} from "../../../../domain/order/actions";
import ShippingMethodForm from ".";

const mapStateToProps = (state: RootState) => ({
    shippingMethods: state.order.orderMeta.shippingMethods,
    chosenShippingMethodName:
        state.order.orderFormData.chosenShippingMethodName,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setChosenShippingMethod: (shippingMethodName: string) =>
        dispatch(setChosenShippingMethod(shippingMethodName)),
    setShippingPrice: (value: number) => dispatch(setShippingPrice(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingMethodForm);
