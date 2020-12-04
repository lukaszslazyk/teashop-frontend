import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import ShippingAddressForm from ".";

const mapStateToProps = (state: RootState) => ({
    countries: state.order.orderMeta.countries,
});

export default connect(mapStateToProps)(ShippingAddressForm);
