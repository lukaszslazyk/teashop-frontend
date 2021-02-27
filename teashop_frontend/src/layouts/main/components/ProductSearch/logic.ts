import { useState } from "react";
import { useHistory } from "react-router";
import routing from "../../../../configuration/routing";

const useLogic = (
    onSearchButtonClick?: () => void,
    onSearchInputBlur?: () => void
) => {
    const [searchInputOpen, setSearchInputOpen] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState("");
    const history = useHistory();

    const handleSearchButtonClicked = () => {
        setSearchInputOpen(true);
        if (onSearchButtonClick)
            onSearchButtonClick();
    };

    const handleSearchInputBlurred = () => {
        setSearchInputOpen(false);
        if (onSearchInputBlur)
            onSearchInputBlur();
    };

    const handleSearchInputChanged = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => setSearchInputValue(event.target.value);

    const handleSearchInputKeyPressed = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && searchInputValue.trim().length !== 0)
            history.push(
                routing.searchResults.getPathWithParams({
                    phrase: searchInputValue,
                })
            );
    };

    return {
        searchInputOpen,
        handleSearchButtonClicked,
        handleSearchInputBlurred,
        handleSearchInputChanged,
        handleSearchInputKeyPressed,
    };
};

export default useLogic;
