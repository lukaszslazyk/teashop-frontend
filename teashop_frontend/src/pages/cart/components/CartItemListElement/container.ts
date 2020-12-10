import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { removeItemFromSessionCart } from "../../../../domain/cart/actions";
import { RequestCancelToken } from "../../../../shared/services/requestCancelTokenService";
import CartItemListElement from ".";

const mapStateToProps = (state: RootState) => ({
    cartUpdateIsSending: state.cart.cartUpdateIsSending,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    removeItemFromCart: (productId: string, cancelToken: RequestCancelToken) =>
        dispatch(removeItemFromSessionCart(productId, cancelToken)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartItemListElement);
