import axios, { CancelTokenSource } from "axios";

export interface RequestCancelToken {
    tokenSource: CancelTokenSource;
    cancel: () => void;
}

export function createRequestCancelToken(): RequestCancelToken {
    const token: RequestCancelToken = {
        tokenSource: axios.CancelToken.source(),
        cancel: () => token.tokenSource.cancel(),
    };

    return token;
}
