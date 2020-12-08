import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { addItemToSessionCart } from "../../../../domain/cart/actions";
import { Product } from "../../../../domain/product/models";
import { RequestCancelToken } from "../../../../shared/services/requestCancelTokenService";
import AddToCartPanel from "./index";

const mapStateToProps = (state: RootState) => ({
    cartIsSending: state.cart.cartUpdateIsSending,
    cartErrorOccurred: state.cart.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    addItemToSessionCart: (
        product: Product,
        quantity: number,
        cancelToken: RequestCancelToken
    ) => dispatch(addItemToSessionCart(product, quantity, cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartPanel);
