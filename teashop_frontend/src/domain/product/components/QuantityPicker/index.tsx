import { ClickAwayListener, Fab, Popper, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { ChangeEvent, useState } from "react";
import useStyles from "./styles";

interface Props {
    inputLabel: string;
    initialValue: number;
    lowThreshold: number;
    step: number;
    quantityChangedCallback: (value: number) => void;
    quantityInvalidCallback?: () => void;
    interactionDisabled?: boolean;
}

const QuantityPicker = (props: Props) => {
    const classes = useStyles();
    const [quantityText, setQuantityText] = useState(
        props.initialValue.toString()
    );
    const [quantityTextChanged, setQuantityTextChanged] = useState(false);
    const [quantityErrorText, setQuantityErrorText] = useState("");
    const [anchorEl, setAnchorEl]: any = useState(null);

    const handleQuantityChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setQuantityText(value);
        setQuantityTextChanged(true);
        if (empty(value) || !validNumber(value)) {
            setQuantityErrorText("Please provide a number");
            if (props.quantityInvalidCallback)
                props.quantityInvalidCallback();
        } else
            setQuantityErrorText("");
        setAnchorEl(event.target);
    };

    const handleQuantityClickAway = () => {
        if (quantityTextChanged) {
            setQuantityTextChanged(false);
            if (quantityErrorText === "")
                if (!greaterThanLowThreshold(quantityText)) {
                    setQuantityText(props.lowThreshold.toString());
                    props.quantityChangedCallback(props.lowThreshold);
                } else
                    props.quantityChangedCallback(Number(quantityText));
        }
    };

    const handleAddClicked = () => {
        setQuantityText((Number(quantityText) + props.step).toString());
        props.quantityChangedCallback(Number(quantityText) + props.step);
    };

    const handleSubtractClicked = () => {
        setQuantityText((Number(quantityText) - props.step).toString());
        props.quantityChangedCallback(Number(quantityText) - props.step);
    };

    const canAdd = (): boolean =>
        quantityErrorText === "";

    const canSubtract = (): boolean =>
        quantityErrorText === "" && greaterThanLowThreshold(quantityText);

    const validNumber = (input: string): boolean =>
        !isNaN(Number(input));

    const empty = (input: string): boolean =>
        input.length === 0;

    const greaterThanLowThreshold = (input: string) =>
        Number(input) > props.lowThreshold;

    return (
        <form className={classes.root}>
            <Fab
                size="small"
                color="primary"
                onClick={handleSubtractClicked}
                disabled={props.interactionDisabled || !canSubtract()}
            >
                <RemoveIcon />
            </Fab>
            <ClickAwayListener onClickAway={handleQuantityClickAway}>
                <TextField
                    id="quantity"
                    label={props.inputLabel}
                    variant="outlined"
                    value={quantityText}
                    onChange={handleQuantityChange}
                    error={quantityErrorText !== ""}
                    className={classes.quantityInput}
                    disabled={props.interactionDisabled}
                />
            </ClickAwayListener>
            <Fab
                size="small"
                color="primary"
                onClick={handleAddClicked}
                disabled={props.interactionDisabled || !canAdd()}
            >
                <AddIcon />
            </Fab>
            <Popper
                open={quantityErrorText !== ""}
                anchorEl={anchorEl}
                className={classes.errorText}
            >
                {quantityErrorText}
            </Popper>
        </form>
    );
};

export default QuantityPicker;
