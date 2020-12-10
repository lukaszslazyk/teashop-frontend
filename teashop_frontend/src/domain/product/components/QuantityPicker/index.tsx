import {
    Fab,
    TextField,
    Tooltip,
    Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { ChangeEvent, useEffect, useState } from "react";
import useStyles from "./styles";

interface Props {
    inputLabel: string;
    quantityText: string;
    errorText: string;
    errorInfoHidden: boolean;
    onQuantityTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onQuantityTextInputFocus: () => void;
    onQuantityTextInputBlur: () => void;
    onAddClicked: () => void;
    onSubtractClicked: () => void;
    hasError: () => boolean;
    canAdd: () => boolean;
    canSubtract: () => boolean;
    interactionDisabled?: boolean;
}

const QuantityPicker = (props: Props) => {
    const classes = useStyles();
    const [errorInfoOpen, setErrorInfoOpen] = useState(false);
    const [displayedErrorText, setDisplayedErrorText] = useState("");
    const { errorInfoHidden, errorText, hasError} = props;

    useEffect(() => {
        if (hasError() && !errorInfoHidden) {
            setDisplayedErrorText(errorText);
            setErrorInfoOpen(true);
        } else
            setErrorInfoOpen(false);
    }, [errorText, errorInfoHidden, hasError]);

    const ErrorText = () => <Typography variant="body1">{displayedErrorText}</Typography>;

    return (
        <form className={classes.root}>
            <Fab
                size="small"
                color="primary"
                onClick={props.onSubtractClicked}
                disabled={!props.canSubtract()}
            >
                <RemoveIcon />
            </Fab>
            <Tooltip open={errorInfoOpen} title={ErrorText()} arrow>
                <TextField
                    id="quantity"
                    variant="outlined"
                    label={props.inputLabel}
                    value={props.quantityText}
                    onChange={props.onQuantityTextChange}
                    onFocus={props.onQuantityTextInputFocus}
                    onBlur={props.onQuantityTextInputBlur}
                    error={props.hasError()}
                    className={classes.quantityInput}
                    disabled={props.interactionDisabled}
                />
            </Tooltip>
            <Fab
                size="small"
                color="primary"
                onClick={props.onAddClicked}
                disabled={!props.canAdd()}
            >
                <AddIcon />
            </Fab>
        </form>
    );
};

export default QuantityPicker;
