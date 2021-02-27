import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import routing from "../../../../configuration/routing";
import {
    decrementCheckoutStep,
    incrementCheckoutStep,
} from "../../../../domain/order/actions";

const useLogic = () => {
    const activeStep = useSelector(
        (state: RootState) => state.order.checkoutStep
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const handleContinueButtonClicked = () => dispatch(incrementCheckoutStep());

    const handleBackButtonClicked = () => {
        if (activeStep === 0)
            history.push(routing.cart);
        else
            dispatch(decrementCheckoutStep());
    };

    return {
        activeStep,
        handleContinueButtonClicked,
        handleBackButtonClicked,
    };
};

export default useLogic;
