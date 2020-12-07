import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import PriceInfoPanel from ".";

const mapStateToProps = (state: RootState) => ({
    totalPrice: state.order.totalPrice,
    cartPrice: state.order.cartPrice,
    shippingPrice: state.order.shippingPrice,
});

export default connect(mapStateToProps)(PriceInfoPanel);
