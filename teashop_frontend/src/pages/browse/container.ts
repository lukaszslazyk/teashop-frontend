import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { fetchProductsInCategory } from "../../domain/product/actions";
import { RequestCancelToken } from "../../shared/services/requestCancelTokenService";
import BrowsePage from "./index";

const mapStateToProps = (state: RootState) => ({
    products: state.product.products,
    isFetching: state.product.isFetching,
    errorOccurred: state.product.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadProductsInCategory: (categoryName: string, cancelToken: RequestCancelToken) =>
        dispatch(fetchProductsInCategory(categoryName, cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
