import { Dispatch } from "react";
import { connect } from "react-redux";
import { ProductActionTypes } from "../../product/actions";
import { getAllProducts } from "../../product/actions";
import BrowsePage from "./BrowsePage";
import { RootState } from "../../redux_setup/rootReducer";

const mapStateToProps = (state: RootState) => ({
    products: state.product.products,
});

const mapDispatchToProps = (dispatch: Dispatch<ProductActionTypes>) => ({
    loadProducts: () => dispatch(getAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
