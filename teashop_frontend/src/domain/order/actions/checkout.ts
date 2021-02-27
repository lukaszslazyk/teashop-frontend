export const INCREMENT_CHECKOUT_STEP = "INCREMENT_CHECKOUT_STEP";
export const DECREMENT_CHECKOUT_STEP = "DECREMENT_CHECKOUT_STEP";
export const CLOSE_CHECKOUT = "CLOSE_CHECKOUT";

interface IncrementCheckoutStepAction {
    type: typeof INCREMENT_CHECKOUT_STEP;
}

interface DecrementCheckoutStepAction {
    type: typeof DECREMENT_CHECKOUT_STEP;
}

interface CloseCheckoutAction {
    type: typeof CLOSE_CHECKOUT;
}

export type CheckoutActionTypes =
    | IncrementCheckoutStepAction
    | DecrementCheckoutStepAction
    | CloseCheckoutAction;

export const incrementCheckoutStep = (): CheckoutActionTypes => ({
    type: INCREMENT_CHECKOUT_STEP,
});

export const decrementCheckoutStep = (): CheckoutActionTypes => ({
    type: DECREMENT_CHECKOUT_STEP,
});

export const closeCheckout = (): CheckoutActionTypes => ({
    type: CLOSE_CHECKOUT,
});
