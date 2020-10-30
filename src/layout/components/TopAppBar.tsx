import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "../styles/mainLayoutStyles";

interface Props {
    handleDrawerToggle: () => void;
}

const TopAppBar = (props: Props) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Link to="/" className={classes.titleLink}>
                    <EcoIcon className={classes.logoIcon} />
                    <Typography variant="h6" noWrap>
                        Tea Shop
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default TopAppBar;
