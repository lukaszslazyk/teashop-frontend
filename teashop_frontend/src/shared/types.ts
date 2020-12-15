import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../configuration/reduxSetup/rootReducer";

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export enum ApiErrorType {
    None,
    NotFound,
    InvalidResponse,
    Timeout,
    Unexpected,
}
