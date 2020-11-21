import { Dispatch } from "react";
import { connect } from "react-redux";
import { fetchProductsInCategory } from "../../domain/product/actions";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import BrowsePage from "./index";
import { CancelToken } from "../../shared/utils/cancelToken";

const mapStateToProps = (state: RootState) => ({
    products: state.product.products,
    isFetching: state.product.isFetching,
    errorOccurred: state.product.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadProductsInCategory: (categoryName: string, cancelToken: CancelToken) =>
        dispatch(fetchProductsInCategory(categoryName, cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
