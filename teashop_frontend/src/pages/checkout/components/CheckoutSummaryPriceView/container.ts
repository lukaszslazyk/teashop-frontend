import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import CheckoutSummaryItemsView from ".";

const mapStateToProps = (state: RootState) => ({
    totalPrice: state.order.totalPrice,
    shippingPrice: state.order.shippingPrice,
});

export default connect(mapStateToProps)(CheckoutSummaryItemsView);
