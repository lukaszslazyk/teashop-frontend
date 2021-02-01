import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, InputBase } from "@material-ui/core";
import useStyles from "./styles";

interface Props {
    onSearchButtonClick?: () => void;
    onSearchInputBlur?: () => void;
}

const ProductSearch = (props: Props) => {
    const classes = useStyles();
    const [searchInputOpen, setSearchInputOpen] = useState(false);

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

    if (!searchInputOpen)
        return (
            <IconButton
                className={classes.searchIcon}
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
                classes={{
                    root: classes.searchFieldInputRoot,
                    input: classes.searchFieldInput,
                }}
            />
        </div>
    );
};

export default ProductSearch;
