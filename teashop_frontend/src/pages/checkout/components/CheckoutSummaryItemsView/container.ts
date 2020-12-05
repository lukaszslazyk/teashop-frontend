import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import CheckoutSummaryItemsView from ".";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
});

export default connect(mapStateToProps)(CheckoutSummaryItemsView);
