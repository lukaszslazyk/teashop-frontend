import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import routing from "../../../../configuration/routing";
import useStyles from "../../styles";
import CartButton from "../CartButton";
import ProductSearch from "../ProductSearch";

interface Props {
    onMenuButtonClick: () => void;
}

const TopAppBar = (props: Props) => {
    const [titleDisplayed, setTitleDisplayed] = useState(true);
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleSearchButtonClicked = () => {
        if (isMobile)
            setTitleDisplayed(false);
    };

    const handleSearchInputBlurred = () => setTitleDisplayed(true);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.onMenuButtonClick}
                >
                    <MenuIcon />
                </IconButton>
                {titleDisplayed && (
                    <Box ml={2}>
                        <Link to={routing.home} className={classes.titleLink}>
                            <EcoIcon />
                            <Box ml={1}>
                                <Typography variant="h6" noWrap>
                                    Tea Shop
                                </Typography>
                            </Box>
                        </Link>
                    </Box>
                )}
                <div className={classes.grow} />
                <ProductSearch
                    onSearchButtonClick={handleSearchButtonClicked}
                    onSearchInputBlur={handleSearchInputBlurred}
                />
                <CartButton />
            </Toolbar>
        </AppBar>
    );
};

export default TopAppBar;
