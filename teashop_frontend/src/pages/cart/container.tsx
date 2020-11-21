import { Dispatch } from "react";
import { connect } from "react-redux";
import {
    fetchSessionCart,
    updateSessionCartItemQuantity,
    removeItemFromSessionCart,
} from "../../domain/cart/actions";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import CartPage from ".";
import { CancelTokenSource } from "axios";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
    isFetching: state.cart.isFetching,
    isSending: state.cart.isSending,
    errorOccurred: state.cart.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getSessionCart: (cancelToken: CancelTokenSource) => dispatch(fetchSessionCart(cancelToken)),
    updateItemQuantity: (productId: string, quantity: number, cancelToken: CancelTokenSource) =>
        dispatch(updateSessionCartItemQuantity(productId, quantity, cancelToken)),
    removeItemFromCart: (productId: string, cancelToken: CancelTokenSource) =>
        dispatch(removeItemFromSessionCart(productId, cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
