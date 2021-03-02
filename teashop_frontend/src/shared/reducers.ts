import {
    SharedActionTypes,
    TOGGLE_DISABLE_INTERACTION_FOR_LOADING,
} from "./actions";

export interface SharedState {
    interactionDisabledForLoading: boolean;
}

const initialState: SharedState = {
    interactionDisabledForLoading: false,
};

export const sharedReducer = (
    state = initialState,
    action: SharedActionTypes
): SharedState => {
    switch (action.type) {
        case TOGGLE_DISABLE_INTERACTION_FOR_LOADING:
            return {
                ...state,
                interactionDisabledForLoading: !state.interactionDisabledForLoading,
            };
        default:
            return state;
    }
};
