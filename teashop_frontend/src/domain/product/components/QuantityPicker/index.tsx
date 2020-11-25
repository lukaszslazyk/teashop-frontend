import { ClickAwayListener, Fab, Paper, Popper, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { ChangeEvent, useRef } from "react";
import useStyles from "./styles";

interface Props {
    inputLabel: string;
    quantityText: string;
    errorText: string;
    errorPopperHidden: boolean;
    interactionDisabled?: boolean;
    handleQuantityTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleQuantityTextFieldClick: () => void;
    handleQuantityTextFieldClickAway: () => void;
    handleAddClicked: () => void;
    handleSubtractClicked: () => void;
    hasError: () => boolean;
    canAdd: () => boolean;
    canSubtract: () => boolean;
}

const QuantityPicker = (props: Props) => {
    const classes = useStyles();
    const quantityTextEl = useRef(null);

    return (
        <form className={classes.root}>
            <Fab
                size="small"
                color="primary"
                onClick={props.handleSubtractClicked}
                disabled={!props.canSubtract()}
            >
                <RemoveIcon />
            </Fab>
            <ClickAwayListener onClickAway={props.handleQuantityTextFieldClickAway}>
                <TextField
                    id="quantity"
                    variant="outlined"
                    ref={quantityTextEl}
                    label={props.inputLabel}
                    value={props.quantityText}
                    onChange={props.handleQuantityTextChange}
                    onClick={props.handleQuantityTextFieldClick}
                    error={props.hasError()}
                    className={classes.quantityInput}
                    disabled={props.interactionDisabled}
                />
            </ClickAwayListener>
            <Fab
                size="small"
                color="primary"
                onClick={props.handleAddClicked}
                disabled={!props.canAdd()}
            >
                <AddIcon />
            </Fab>
            <Popper
                open={!props.errorPopperHidden && props.hasError()}
                anchorEl={quantityTextEl.current}
            >
                <Paper className={classes.errorPaper}>
                    {props.errorText}
                </Paper>
            </Popper>
        </form>
    );
};

export default QuantityPicker;
