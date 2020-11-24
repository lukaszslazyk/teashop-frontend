import axios, { CancelTokenSource } from "axios";

export interface RequestCancelToken {
    tokenSource: CancelTokenSource;
    cancel: () => void;
}

export const createRequestCancelToken = (): RequestCancelToken => {
    const token: RequestCancelToken = {
        tokenSource: axios.CancelToken.source(),
        cancel: () => token.tokenSource.cancel(),
    };
    return token;
};
