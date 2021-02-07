import { Badge, CircularProgress, IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import routing from "../../../../configuration/routing";
import useStyles from "./styles";

const CartButton = () => {
    const cartSize = useSelector(
        (state: RootState) => state.cart.cart.items.length
    );
    const cartFetchedYet = useSelector(
        (state: RootState) => state.cart.cartFetchedYet
    );
    const classes = useStyles();

    return (
        <IconButton
            component={Link}
            to={routing.cart}
            className={classes.iconButton}
        >
            {!cartFetchedYet && (
                <Badge
                    badgeContent={
                        <CircularProgress
                            size={12}
                            thickness={7}
                            className={classes.progressIndicator}
                        />
                    }
                    color="primary"
                >
                    <ShoppingCartIcon />
                </Badge>
            )}
            {cartFetchedYet && cartSize === 0 && <ShoppingCartIcon />}
            {cartFetchedYet && cartSize > 0 && (
                <Badge badgeContent={cartSize} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            )}
        </IconButton>
    );
};

export default CartButton;
