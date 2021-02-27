import {
    Fab,
    InputAdornment,
    OutlinedInput,
    Tooltip,
    Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import useLogic from "./logic";
import useStyles from "./styles";

interface Props {
    initialValue: number;
    lowThreshold: number;
    step: number;
    onQuantityChange: (value: number, valid: boolean) => void;
    unit?: string;
}

const QuantityPicker = (props: Props) => {
    const logic = useLogic(
        props.initialValue,
        props.lowThreshold,
        props.step,
        props.onQuantityChange
    );
    const classes = useStyles();

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
            <Tooltip
                open={logic.errorInfoOpen}
                title={
                    <Typography variant="body1">
                        {logic.displayedErrorText}
                    </Typography>
                }
                arrow
            >
                <OutlinedInput
                    id="quantity"
                    value={logic.quantityText}
                    onChange={logic.handleQuantityTextChange}
                    onFocus={logic.handleQuantityTextInputFocused}
                    onBlur={logic.handleQuantityTextInputBlured}
                    error={logic.hasError()}
                    endAdornment={
                        props.unit && (
                            <InputAdornment position="end">
                                {props.unit}
                            </InputAdornment>
                        )
                    }
                    className={classes.quantityInput}
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
