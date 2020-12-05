import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import CheckoutSummary from ".";

const mapStateToProps = (state: RootState) => ({
    chosenShippingMethodName: state.order.orderFormData.chosenShippingMethodName,
    chosenPaymentMethodName: state.order.orderFormData.chosenPaymentMethodName,
});

export default connect(mapStateToProps)(CheckoutSummary);
