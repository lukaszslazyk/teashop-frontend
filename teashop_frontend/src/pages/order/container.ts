import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { fetchSessionCart } from "../../domain/cart/actions";
import { RequestCancelToken } from "../../shared/services/requestCancelTokenService";
import OrderPage from ".";

const mapStateToProps = (state: RootState) => ({
    cart: state.cart.cart,
    // isFetching: state.cart.isFetching,
    // isSending: state.cart.isSending,
    // errorOccurred: state.cart.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    // getSessionCart: (cancelToken: RequestCancelToken) =>
    //     dispatch(fetchSessionCart(cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
