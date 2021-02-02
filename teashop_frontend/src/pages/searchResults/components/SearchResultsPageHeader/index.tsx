import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

interface Props {
    searchPhrase: string;
    resultsCount: number;
    resultsAreLoading: boolean;
}

const SearchResultsPageHeader = (props: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Box mb={3}>
            <Typography variant={isMobile ? "h5" : "h4"} color="primary">
                Search results for phrase: "{props.searchPhrase}"
            </Typography>
            <Typography variant={isMobile ? "body1" : "h6"}>
                {props.resultsAreLoading ? (
                    <Skeleton animation="wave" width={175} />
                ) :
                    `Found ${props.resultsCount} products`
                }
            </Typography>
        </Box>
    );
};

export default SearchResultsPageHeader;
