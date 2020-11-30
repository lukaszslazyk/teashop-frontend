import { connect } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import CheckoutPage from ".";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
    cartFetchedOnInit: state.cart.fetchedYet,
});

export default connect(mapStateToProps)(CheckoutPage);
