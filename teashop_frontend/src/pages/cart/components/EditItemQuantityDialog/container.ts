import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { updateSessionCartItemQuantity } from "../../../../domain/cart/actions";
import { RequestCancelToken } from "../../../../shared/services/requestCancelTokenService";
import CartPage from ".";

const mapStateToProps = (state: RootState) => ({
    cartUpdateIsSending: state.cart.cartUpdateIsSending,
    // errorOccurred: state.cart.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    updateItemQuantity: (productId: string, quantity: number, cancelToken: RequestCancelToken) =>
        dispatch(updateSessionCartItemQuantity(productId, quantity, cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
