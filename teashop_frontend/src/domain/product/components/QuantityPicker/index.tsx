import { ClickAwayListener, Fab, Popper, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
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
    const [quantityText, setQuantityText] = React.useState(
        props.initialValue.toString()
    );
    const [quantityTextChanged, setQuantityTextChanged] = React.useState(false);
    const [quantityErrorText, setQuantityErrorText] = React.useState("");
    const [anchorEl, setAnchorEl]: any = React.useState(null);

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = event.target.value;
        setQuantityText(value);
        setQuantityTextChanged(true);
        if (empty(value) || !validNumber(value)) {
            setQuantityErrorText("Please provide a number");
            if (props.quantityInvalidCallback)
                props.quantityInvalidCallback();
        }
        else setQuantityErrorText("");
        setAnchorEl(event.target);
    };

    const handleQuantityClickAway = () => {
        if (quantityTextChanged) {
            setQuantityTextChanged(false);
            if (quantityErrorText === "") {
                if (!greaterThanLowThreshold(quantityText)) {
                    setQuantityText(props.lowThreshold.toString());
                    props.quantityChangedCallback(props.lowThreshold);
                } else props.quantityChangedCallback(+quantityText);
            }
        }
    };

    const handleAddClicked = () => {
        setQuantityText((+quantityText + props.step).toString());
        props.quantityChangedCallback(+quantityText + props.step);
    };

    const handleSubtractClicked = () => {
        setQuantityText((+quantityText - props.step).toString());
        props.quantityChangedCallback(+quantityText - props.step);
    };

    const canAdd = ():boolean => {
        return quantityErrorText === "";
    }

    const canSubtract = ():boolean => {
        return quantityErrorText === "" && greaterThanLowThreshold(quantityText)
    }

    const validNumber = (input: string): boolean => {
        return !isNaN(+input);
    };

    const empty = (input: string): boolean => {
        return input.length === 0;
    };

    const greaterThanLowThreshold = (input: string) => {
        return +input > props.lowThreshold;
    };

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
