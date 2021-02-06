export const CHOOSE_SORT_OPTION = "CHOOSE_SORT_OPTION";

interface ChooseSortOptionAction {
    type: typeof CHOOSE_SORT_OPTION;
    sortOptionName: string;
}

export type SortOptionsActionTypes = ChooseSortOptionAction;

export const chooseSortOption = (
    sortOptionName: string
): SortOptionsActionTypes => ({
    type: CHOOSE_SORT_OPTION,
    sortOptionName: sortOptionName,
});
