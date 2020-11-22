import axios, { CancelTokenSource } from "axios";

export interface CancelToken {
    tokenSource: CancelTokenSource;
    cancel: () => void;
}

export function createCancelToken(): CancelToken {
    const token: CancelToken = {
        tokenSource: axios.CancelToken.source(),
        cancel: () => token.tokenSource.cancel(),
    };

    return token;
}
