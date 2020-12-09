import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import CheckoutMainView from ".";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
    cartFetchedYet: state.cart.cartFetchedYet,
});

export default connect(mapStateToProps)(CheckoutMainView);
