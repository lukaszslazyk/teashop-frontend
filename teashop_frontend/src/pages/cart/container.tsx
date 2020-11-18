import { Dispatch } from "react";
import { connect } from "react-redux";
import {
    fetchSessionCart,
    removeItemFromSessionCart,
} from "../../domain/cart/actions";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import CartPage from ".";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
    isFetching: state.cart.isFetching,
    isSending: state.cart.isSending,
    errorOccurred: state.cart.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getSessionCart: () => dispatch(fetchSessionCart()),
    removeItemFromCart: (productId: string) =>
        dispatch(removeItemFromSessionCart(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
