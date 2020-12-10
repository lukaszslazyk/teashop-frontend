import { Badge, IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import routing from "../../../../configuration/routing";
import useStyles from "./styles";

const CartIcon = () => {
    const cartSize = useSelector(
        (state: RootState) => state.cart.cart.items.length
    );
    const classes = useStyles();

    return (
        <IconButton className={classes.root} component={Link} to={routing.cart}>
            <Badge badgeContent={cartSize} color="error">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    );
};

export default CartIcon;
