import {
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useRef, useState } from "react";
import useStyles from "./styles";

interface Props {
    showProgress: boolean;
    onEditMenuItemClick: () => void;
    onRemoveMenuItemClick: () => void;
}

const CartItemListElementMobileMenu = (props: Props) => {
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);
    const buttonRef = useRef(null);

    const handleMoreButtonClicked = () =>
        setMenuOpen(true);

    const handleClose = () => {
        if (!props.showProgress)
            setMenuOpen(false);
    };

    return (
        <div>
            <IconButton
                ref={buttonRef}
                edge="end"
                onClick={handleMoreButtonClicked}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                open={menuOpen}
                anchorEl={buttonRef.current}
                keepMounted
                onClose={handleClose}
            >
                <MenuItem onClick={props.onEditMenuItemClick}>
                    <EditIcon
                        color="primary"
                        fontSize="small"
                        className={classes.menuIcon}
                    />
                    <Typography variant="inherit">Edit quantity</Typography>
                </MenuItem>
                <MenuItem onClick={props.onRemoveMenuItemClick}>
                    {props.showProgress ? (
                        <CircularProgress
                            size={24}
                            className={classes.menuIcon}
                        />
                    ) : (
                        <DeleteIcon
                            fontSize="small"
                            className={`${classes.menuIcon} ${classes.removeIcon}`}
                        />
                    )}
                    <Typography variant="inherit">Remove</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default CartItemListElementMobileMenu;
