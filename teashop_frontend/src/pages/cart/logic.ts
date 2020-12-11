import { useSelector } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";

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

    const cartIsEmpty = (): boolean =>
        cart.items.length === 0;

    return {
        cart,
        cartFetchedYet,
        cartUpdateIsSending,
        errorOccurred,
        cartIsEmpty,
    };
};

export default useLogic;
