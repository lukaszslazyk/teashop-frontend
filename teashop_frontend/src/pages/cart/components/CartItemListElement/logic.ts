import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { removeItemFromSessionCart } from "../../../../domain/cart/actions";
import { CartItem } from "../../../../domain/cart/models";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";

const useLogic = (cartItem: CartItem) => {
    const cartUpdateIsSending = useSelector(
        (state: RootState) => state.cart.cartUpdateIsSending
    );
    const dispatch = useDispatch();
    const [showProgress, setShowProgress] = useState(false);
    const [openEditQuantityDialog, setOpenEditQuantityDialog] = useState(false);

    useEffect(() => {
        if (!cartUpdateIsSending)
            setShowProgress(false);
    }, [cartUpdateIsSending]);

    const handleEditClicked = () => setOpenEditQuantityDialog(true);

    const handleEditQuantityDialogClose = () =>
        setOpenEditQuantityDialog(false);

    const handleRemoveClicked = () => {
        dispatch(
            removeItemFromSessionCart(
                cartItem.product.id,
                createRequestCancelToken()
            )
        );
        setShowProgress(true);
    };

    return {
        showProgress,
        openEditQuantityDialog,
        handleEditClicked,
        handleEditQuantityDialogClose,
        handleRemoveClicked,
    };
};

export default useLogic;
