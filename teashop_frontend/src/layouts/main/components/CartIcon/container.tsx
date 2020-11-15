import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import CartIcon from "./index";

const mapStateToProps = (state: RootState) => ({
    cartSize: state.cart.cart.items.length,
});

export default connect(mapStateToProps)(CartIcon);
