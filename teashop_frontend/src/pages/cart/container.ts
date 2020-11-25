import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import {
    fetchSessionCart,
    removeItemFromSessionCart,
    updateSessionCartItemQuantity
} from "../../domain/cart/actions";
import { RequestCancelToken } from "../../shared/services/requestCancelTokenService";
import CartPage from ".";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
    isFetching: state.cart.isFetching,
    isSending: state.cart.isSending,
    errorOccurred: state.cart.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getSessionCart: (cancelToken: RequestCancelToken) => dispatch(fetchSessionCart(cancelToken)),
    updateItemQuantity: (productId: string, quantity: number, cancelToken: RequestCancelToken) =>
        dispatch(updateSessionCartItemQuantity(productId, quantity, cancelToken)),
    removeItemFromCart: (productId: string, cancelToken: RequestCancelToken) =>
        dispatch(removeItemFromSessionCart(productId, cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);