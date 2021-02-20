import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
import { Product } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_PRODUCT_BY_PRODUCT_NUMBER = "REQUEST_PRODUCT_BY_PRODUCT_NUMBER";
export const RECEIVE_PRODUCT_BY_PRODUCT_NUMBER = "RECEIVE_PRODUCT_BY_PRODUCT_NUMBER";

interface RequestProductByProductNumberAction {
    type: typeof REQUEST_PRODUCT_BY_PRODUCT_NUMBER;
}

interface ReceiveProductByProductNumberAction {
    type: typeof RECEIVE_PRODUCT_BY_PRODUCT_NUMBER;
    product: Product | null;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

export type FetchProductByProductNumberActionTypes =
    | RequestProductByProductNumberAction
    | ReceiveProductByProductNumberAction;

export const requestProductByProductNumber = (): FetchProductByProductNumberActionTypes => ({
    type: REQUEST_PRODUCT_BY_PRODUCT_NUMBER,
});

export const receiveProductByProductNumber = (
    product: Product | null,
    errorOccurred: boolean = false,
    errorType = ApiErrorType.None
): FetchProductByProductNumberActionTypes => ({
    type: RECEIVE_PRODUCT_BY_PRODUCT_NUMBER,
    product: product,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveProductByProductNumberError = (
    errorType = ApiErrorType.None
): FetchProductByProductNumberActionTypes => ({
    type: RECEIVE_PRODUCT_BY_PRODUCT_NUMBER,
    product: null,
    errorOccurred: true,
    errorType: errorType,
});

export const fetchProductByProductNumber = (
    productNumber: string,
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestProductByProductNumber());
    await axios
        .get(`${API_ROOT}/products/number/${productNumber}`, {
            cancelToken: cancelToken.tokenSource.token,
        })
        .then(response => dispatch(receiveProductByProductNumber(response.data)))
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(receiveProductByProductNumberError(ApiErrorType.Timeout));
                else if (error.response.status === 404)
                    dispatch(receiveProductByProductNumberError(ApiErrorType.NotFound));
                else
                    dispatch(receiveProductByProductNumberError(ApiErrorType.Unexpected));
        });
};
