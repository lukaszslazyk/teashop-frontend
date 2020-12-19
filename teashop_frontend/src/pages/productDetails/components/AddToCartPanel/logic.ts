import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { addItemToSessionCart } from "../../../../domain/cart/actions";
import { Product } from "../../../../domain/product/models";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";
import useAddItemToCartResponseNotification from "../../hooks/addItemToCartResponseNotification";

const useLogic = (
    product: Product,
    onQuantityChange: (value: number) => void
) => {
    const cartUpdateIsSending = useSelector(
        (state: RootState) => state.cart.cartUpdateIsSending
    );
    const cartErrorOccurred = useSelector(
        (state: RootState) => state.cart.errorOccurred
    );
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(product.quantityPerPrice);
    const [quantityPickerValid, setQuantityPickerValid] = useState(true);

    useAddItemToCartResponseNotification(
        cartUpdateIsSending,
        cartErrorOccurred
    );

    const handleQuantityChanged = (value: number, valid: boolean) => {
        setQuantityPickerValid(valid);
        if (valid) {
            setQuantity(value);
            onQuantityChange(value);
        }
    };

    const handleAddToChartButtonClicked = () => {
        if (quantityPickerValid)
            dispatch(
                addItemToSessionCart(
                    product,
                    quantity,
                    createRequestCancelToken()
                )
            );
    };

    const addToCartButtonDisabled = () =>
        cartUpdateIsSending || !quantityPickerValid;

    return {
        cartUpdateIsSending,
        handleQuantityChanged,
        handleAddToChartButtonClicked,
        addToCartButtonDisabled,
    };
};

export default useLogic;
