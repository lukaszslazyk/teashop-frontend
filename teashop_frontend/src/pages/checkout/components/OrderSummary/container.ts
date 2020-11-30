import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import OrderSummary from ".";

const mapStateToProps = (state: RootState) => ({
    contactInfo: state.order.contactInfo,
    shippingAddress: state.order.shippingAddress,
    chosenShippingMethod: state.order.chosenShippingMethod,
    chosenPaymentMethod: state.order.chosenPaymentMethod,
    cart: state.cart.cart,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
