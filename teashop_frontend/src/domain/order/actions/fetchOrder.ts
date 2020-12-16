import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
import { Order } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_ORDER = "REQUEST_ORDER";
export const RECEIVE_ORDER = "RECEIVE_ORDER";

interface RequestOrderAction {
    type: typeof REQUEST_ORDER;
}

interface ReceiveOrderAtion {
    type: typeof RECEIVE_ORDER;
    order: Order | null;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

export type FetchOrderActionTypes = RequestOrderAction | ReceiveOrderAtion;

export const requestOrder = (): FetchOrderActionTypes => ({
    type: REQUEST_ORDER,
});

export const receiveOrder = (
    order: Order | null,
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): FetchOrderActionTypes => ({
    type: RECEIVE_ORDER,
    order: order,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveOrderError = (
    errorType: ApiErrorType
): FetchOrderActionTypes => ({
    type: RECEIVE_ORDER,
    order: null,
    errorOccurred: true,
    errorType: errorType,
});

export const fetchOrder = (
    orderId: string,
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestOrder());
    await axios
        .get(`${API_ROOT}/order/${orderId}`, {
            cancelToken: cancelToken.tokenSource.token,
        })
        .then(response => dispatch(receiveOrder(response.data)))
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(receiveOrderError(ApiErrorType.Timeout));
                else
                    dispatch(receiveOrderError(ApiErrorType.Unexpected));
        });
};
