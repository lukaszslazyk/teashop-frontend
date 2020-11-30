import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import CheckoutPage from ".";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
});

export default connect(mapStateToProps)(CheckoutPage);
