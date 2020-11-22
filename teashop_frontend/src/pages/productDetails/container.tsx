import { Dispatch } from "react";
import { connect } from "react-redux";
import { addItemToSessionCart } from "../../domain/cart/actions";
import { Product } from "../../domain/product/models";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import ProductDetailsPage from "./index";
import { fetchProductById } from "../../domain/product/actions";
import { RequestCancelToken } from "../../shared/services/requestCancelTokenService";

const mapStateToProps = (state: RootState) => ({
    product: state.product.product,
    productIsFetching: state.product.isFetching,
    productErrorOccurred: state.product.errorOccurred,
    cartIsSending: state.cart.isSending,
    cartErrorOccurred: state.cart.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadProduct: (productId: string, cancelToken: RequestCancelToken) =>
        dispatch(fetchProductById(productId, cancelToken)),
    addItemToSessionCart: (
        product: Product,
        quantity: number,
        cancelToken: RequestCancelToken
    ) => dispatch(addItemToSessionCart(product, quantity, cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);
