import { Badge, IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import useStyles from "./styles";

interface Props {
    cartSize: number;
}

const CartIcon = (props: Props) => {
    const classes = useStyles();

    return (
        <IconButton className={classes.root} >
            <Badge badgeContent={props.cartSize} color="error">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    );
};

export default CartIcon;
