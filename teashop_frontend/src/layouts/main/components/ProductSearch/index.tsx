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
    const logic = useLogic(props.onSearchButtonClick, props.onSearchInputBlur);
    const classes = useStyles();
    const { searchInputOpen } = logic;

    if (!searchInputOpen)
        return (
            <IconButton
                className={classes.searchIconButton}
                onClick={logic.handleSearchButtonClicked}
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
                onBlur={logic.handleSearchInputBlurred}
                onChange={logic.handleSearchInputChanged}
                onKeyPress={logic.handleSearchInputKeyPressed}
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
