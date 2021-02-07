import { IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import useLogic from "./logic";
import useStyles from "./styles";

const maxLength = 32;

interface Props {
    onSearchButtonClick?: () => void;
    onSearchInputBlur?: () => void;
}

const ProductSearch = (props: Props) => {
    const {
        searchInputOpen,
        handleSearchButtonClicked,
        handleSearchInputBlurred,
        handleSearchInputChanged,
        handleSearchInputKeyPressed,
    } = useLogic(props.onSearchButtonClick, props.onSearchInputBlur);
    const classes = useStyles();

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
