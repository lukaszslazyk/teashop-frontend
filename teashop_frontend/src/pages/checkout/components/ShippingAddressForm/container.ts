import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import ShippingAddressForm from ".";

const mapStateToProps = (state: RootState) => ({
    availableCountries: state.order.availableCountries,
});

export default connect(mapStateToProps)(ShippingAddressForm);
