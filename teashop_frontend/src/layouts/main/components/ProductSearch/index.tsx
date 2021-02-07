import { IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useHistory } from "react-router";
import routing from "../../../../configuration/routing";
import useStyles from "./styles";

const maxLength = 32;

interface Props {
    onSearchButtonClick?: () => void;
    onSearchInputBlur?: () => void;
}

const ProductSearch = (props: Props) => {
    const [searchInputOpen, setSearchInputOpen] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState("");
    const history = useHistory();
    const classes = useStyles();

    const handleSearchButtonClicked = () => {
        setSearchInputOpen(true);
        if (props.onSearchButtonClick)
            props.onSearchButtonClick();
    };

    const handleSearchInputBlurred = () => {
        setSearchInputOpen(false);
        if (props.onSearchInputBlur)
            props.onSearchInputBlur();
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

    if (!searchInputOpen)
        return (
            <IconButton
                className={classes.searchIconButton}
                onClick={handleSearchButtonClicked}
            >
                <SearchIcon />
            </IconButton>
        );

    return (
        <div className={classes.searchField}>
            <div className={classes.searchFieldIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search..."
                autoFocus
                onBlur={handleSearchInputBlurred}
                onChange={handleSearchInputChanged}
                onKeyPress={handleSearchInputKeyPressed}
                classes={{
                    root: classes.searchFieldInputRoot,
                    input: classes.searchFieldInput,
                }}
                inputProps={{
                    maxLength: maxLength,
                }}
            />
        </div>
    );
};

export default ProductSearch;
