import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import ProgressStepLayout from ".";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
    chosenShippingMethod: state.order.createdOrder.chosenShippingMethod,
});

export default connect(mapStateToProps)(ProgressStepLayout);
