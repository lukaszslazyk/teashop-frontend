import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import CheckoutSummaryInfoView from ".";

const mapStateToProps = (state: RootState) => ({
    contactInfoFormData: state.order.orderFormData.contactInfoFormData,
    shippingAddressFormData: state.order.orderFormData.shippingAddressFormData,
    chosenShippingMethodName: state.order.orderFormData.chosenShippingMethodName,
    chosenPaymentMethodName: state.order.orderFormData.chosenPaymentMethodName,
    countries: state.order.orderMeta.countries,
    shippingMethods: state.order.orderMeta.shippingMethods,
    paymentMethods: state.order.orderMeta.paymentMethods,
});

export default connect(mapStateToProps)(CheckoutSummaryInfoView);
