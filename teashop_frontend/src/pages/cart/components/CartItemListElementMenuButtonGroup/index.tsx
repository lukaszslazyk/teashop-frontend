import { CircularProgress, Grid, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import useStyles from "./styles";

interface Props {
    showProgress: boolean;
    onEditButtonClick: () => void;
    onRemoveButtonClick: () => void;
}

const CartItemListElementMenuButtonGroup = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid item>
                <IconButton color="primary" onClick={props.onEditButtonClick}>
                    <EditIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton
                    onClick={props.onRemoveButtonClick}
                    className={classes.removeButton}
                    disabled={props.showProgress}
                >
                    {props.showProgress ? (
                        <CircularProgress size={24} />
                    ) : (
                        <DeleteIcon />
                    )}
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default CartItemListElementMenuButtonGroup;
