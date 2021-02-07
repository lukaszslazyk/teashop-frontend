import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
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
    errorType: ApiErrorType;
}

export type FetchProductByIdActionTypes =
    | RequestProductByIdAction
    | ReceiveProductByIdAction;

export const requestProductById = (): FetchProductByIdActionTypes => ({
    type: REQUEST_PRODUCT_BY_ID,
});

export const receiveProductById = (
    product: Product | null,
    errorOccurred: boolean = false,
    errorType = ApiErrorType.None
): FetchProductByIdActionTypes => ({
    type: RECEIVE_PRODUCT_BY_ID,
    product: product,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveProductByIdError = (
    errorType = ApiErrorType.None
): FetchProductByIdActionTypes => ({
    type: RECEIVE_PRODUCT_BY_ID,
    product: null,
    errorOccurred: true,
    errorType: errorType,
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
                if (error.message === "Network Error")
                    dispatch(receiveProductByIdError(ApiErrorType.Timeout));
                else if (error.response.status === 404)
                    dispatch(receiveProductByIdError(ApiErrorType.NotFound));
                else
                    dispatch(receiveProductByIdError(ApiErrorType.Unexpected));
        });
};
