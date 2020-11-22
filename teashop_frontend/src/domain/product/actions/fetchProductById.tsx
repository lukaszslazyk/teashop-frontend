import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { AppThunk } from "../../../shared/types";
import { Product } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_PRODUCT_BY_ID = "REQUEST_PRODUCT_BY_ID";
export const RECEIVE_PRODUCT_BY_ID = "RECEIVE_PRODUCT_BY_ID";

interface RequestProductByIdAction {
    type: typeof REQUEST_PRODUCT_BY_ID;
}

interface ReceiveProductByIdAction {
    type: typeof RECEIVE_PRODUCT_BY_ID;
    product: Product | null;
    errorOccurred: boolean;
}

export type FetchProductByIdActionTypes =
    | RequestProductByIdAction
    | ReceiveProductByIdAction;

export const requestProductById = (): FetchProductByIdActionTypes => ({
    type: REQUEST_PRODUCT_BY_ID,
});

export const receiveProductById = (
    product: Product | null,
    errorOccurred: boolean = false
): FetchProductByIdActionTypes => ({
    type: RECEIVE_PRODUCT_BY_ID,
    product: product,
    errorOccurred: errorOccurred,
});

export const fetchProductById = (
    productId: string,
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestProductById());
    await axios
        .get(`${API_ROOT}/products/${productId}`, {
            cancelToken: cancelToken.tokenSource.token,
        })
        .then(response => dispatch(receiveProductById(response.data)))
        .catch(error => {
            if (!axios.isCancel(error))
                dispatch(receiveProductById(null, true));
        });
};
