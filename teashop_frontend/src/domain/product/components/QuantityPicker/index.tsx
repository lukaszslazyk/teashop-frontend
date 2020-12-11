import { Fab, TextField, Tooltip, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import useLogic from "./logic";
import useStyles from "./styles";

interface Props {
    inputLabel: string;
    initialValue: number;
    lowThreshold: number;
    step: number;
    onQuantityChange: (value: number, valid: boolean) => void;
    interactionDisabled?: boolean;
    onQuantityTextInputFocus?: () => void;
    onQuantityTextInputBlur?: () => void;
}

const QuantityPicker = (props: Props) => {
    const logic = useLogic(
        props.initialValue,
        props.lowThreshold,
        props.step,
        props.onQuantityChange,
        props.onQuantityTextInputFocus,
        props.onQuantityTextInputBlur
    );
    const classes = useStyles();
    const { quantityText, displayedErrorText, errorInfoOpen } = logic;

    const ErrorText = () => (
        <Typography variant="body1">{displayedErrorText}</Typography>
    );

    return (
        <form className={classes.root}>
            <Fab
                size="small"
                color="primary"
                onClick={logic.handleSubtractClicked}
                disabled={!logic.canSubtract()}
            >
                <RemoveIcon />
            </Fab>
            <Tooltip open={errorInfoOpen} title={ErrorText()} arrow>
                <TextField
                    id="quantity"
                    variant="outlined"
                    label={props.inputLabel}
                    value={quantityText}
                    onChange={logic.handleQuantityTextChange}
                    onFocus={logic.handleQuantityTextInputFocused}
                    onBlur={logic.handleQuantityTextInputBlured}
                    error={logic.hasError()}
                    className={classes.quantityInput}
                    disabled={props.interactionDisabled}
                />
            </Tooltip>
            <Fab
                size="small"
                color="primary"
                onClick={logic.handleAddClicked}
                disabled={!logic.canAdd()}
            >
                <AddIcon />
            </Fab>
        </form>
    );
};

export default QuantityPicker;
