import { AppBar, Box, IconButton, Toolbar, Typography } from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../../configuration/routing";
import useStyles from "../../styles";
import CartIconContainer from "../CartIcon/container";

interface Props {
    handleDrawerToggle: () => void;
}

const TopAppBar = (props: Props) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Box mr={2}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Link to={routing.home} className={classes.titleLink}>
                    <EcoIcon/>
                    <Box ml={1}>
                        <Typography variant="h6" noWrap>
                            Tea Shop
                        </Typography>
                    </Box>
                </Link>
                <div className={classes.grow} />
                <CartIconContainer />
            </Toolbar>
        </AppBar>
    );
};

export default TopAppBar;
