import { connect } from "react-redux";
import { RootState } from "../../../../redux_setup/rootReducer";
import CartIcon from "./index";

const mapStateToProps = (state: RootState) => ({
    cartSize: state.cart.cart.items.length,
});

export default connect(mapStateToProps)(CartIcon);
