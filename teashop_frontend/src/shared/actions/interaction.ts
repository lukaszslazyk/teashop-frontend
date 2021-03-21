export const TOGGLE_DISABLE_INTERACTION_FOR_LOADING =
    "TOGGLE_DISABLE_INTERACTION_FOR_LOADING";

interface ToggleDisableInteractionForLoadingAction {
    type: typeof TOGGLE_DISABLE_INTERACTION_FOR_LOADING;
}

export type InteractionActionTypes = ToggleDisableInteractionForLoadingAction;

export const toggleDisableInteractionForLoading = (): InteractionActionTypes => ({
    type: TOGGLE_DISABLE_INTERACTION_FOR_LOADING,
});
