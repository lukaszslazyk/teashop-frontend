import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";

interface Props {
    searchPhrase: string;
}

const SearchResultsPageHeader = (props: Props) => {
    const productsAreFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const resultsCount = useSelector(
        (state: RootState) => state.product.totalCount
    );
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <div>
            <Typography variant={isMobile ? "h5" : "h4"} color="primary">
                Search results for phrase: "{props.searchPhrase}"
            </Typography>
            <Typography variant={isMobile ? "body1" : "h6"}>
                {productsAreFetching ? (
                    <Skeleton animation="wave" width={175} />
                ) :
                    `Found ${resultsCount} products`
                }
            </Typography>
        </div>
    );
};

export default SearchResultsPageHeader;
