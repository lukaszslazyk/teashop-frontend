import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { updateSessionCartItemQuantity } from "../../../../domain/cart/actions";
import { CartItem } from "../../../../domain/cart/models";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";

const useLogic = (open: boolean, cartItem: CartItem, onClose: () => void) => {
    const cartUpdateIsSending = useSelector(
        (state: RootState) => state.cart.cartUpdateIsSending
    );
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const [quantityPickerValid, setQuantityPickerValid] = useState(true);
    const [
        quantityPickerTextInputFocused,
        setQuantityPickerTextInputFocused,
    ] = useState(false);
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);

    useEffect(() => {
        if (open)
            setDisplayLoading(false);
    }, [open, setDisplayLoading]);

    useEffect(() => {
        if (!cartUpdateIsSending && waitingForResponse) {
            setWaitingForResponse(false);
            onClose();
        }
    }, [cartUpdateIsSending, waitingForResponse, onClose]);

    const handleQuantityChanged = (value: number, valid: boolean) => {
        setQuantityPickerValid(valid);
        if (valid)
            setQuantity(value);
    };

    const handleQuantityTextInputFocus = () =>
        setQuantityPickerTextInputFocused(true);

    const handleQuantityTextInputBlur = () =>
        setQuantityPickerTextInputFocused(false);

    const handleAcceptButtonClicked = () => {
        if (cartItem.quantity !== quantity && quantityPickerValid) {
            dispatch(
                updateSessionCartItemQuantity(
                    cartItem.product.id,
                    quantity,
                    createRequestCancelToken()
                )
            );
            setWaitingForResponse(true);
            setDisplayLoading(true);
        } else
            onClose();
    };

    const handleClose = () => {
        if (!cartUpdateIsSending) {
            setQuantityPickerValid(true);
            setQuantityPickerTextInputFocused(false);
            onClose();
        }
    };

    const addToCartButtonDisabled = () =>
        displayLoading ||
        !quantityPickerValid ||
        quantityPickerTextInputFocused;

    return {
        displayLoading,
        handleQuantityChanged,
        handleQuantityTextInputFocus,
        handleQuantityTextInputBlur,
        handleAcceptButtonClicked,
        handleClose,
        addToCartButtonDisabled
    };
};

export default useLogic;
