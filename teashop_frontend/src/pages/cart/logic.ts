import { useSelector } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { ApiErrorType } from "../../shared/types";

const useLogic = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartFetchedYet = useSelector(
        (state: RootState) => state.cart.cartFetchedYet
    );
    const cartUpdateIsSending = useSelector(
        (state: RootState) => state.cart.cartUpdateIsSending
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.cart.errorOccurred
    );
    const errorType = useSelector((state: RootState) => state.cart.errorType);

    const cartIsEmpty = (): boolean =>
        cart.items.length === 0;

    const getErrorMessage = (): string => {
        if (errorType === ApiErrorType.Unavailable)
            return "Your cart is currently unavailable.\nPlease try again later.";
        else if (errorType === ApiErrorType.Unexpected)
            return "We've encountered some issues on our servers.\nPlease try again later.";
        return "";
    };

    return {
        cart,
        cartFetchedYet,
        cartUpdateIsSending,
        errorOccurred,
        cartIsEmpty,
        getErrorMessage,
    };
};

export default useLogic;
