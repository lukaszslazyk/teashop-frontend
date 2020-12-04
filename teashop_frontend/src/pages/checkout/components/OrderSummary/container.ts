import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import OrderSummary from ".";

const mapStateToProps = (state: RootState) => ({
    contactInfo: state.order.createdOrder.contactInfo,
    shippingAddress: state.order.createdOrder.shippingAddress,
    chosenShippingMethod: state.order.createdOrder.chosenShippingMethod,
    chosenPaymentMethod: state.order.createdOrder.chosenPaymentMethod,
    cart: state.cart.cart,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
