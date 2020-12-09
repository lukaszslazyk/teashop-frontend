import { connect } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import CartPage from ".";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
    cartFetchedYet: state.cart.cartFetchedYet,
    cartUpdateIsSending: state.cart.cartUpdateIsSending,
    errorOccurred: state.cart.errorOccurred,
});

export default connect(mapStateToProps)(CartPage);
