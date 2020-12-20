import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    ClickAwayListener,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    Tooltip,
    Typography,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import React, { ReactNode } from "react";
import useLogic from "./logic";
import useStyles from "./styles";

interface Props {
    currentValue: string;
    paymentCardFormComponent: ReactNode;
}

const PaymentCardRadio = (props: Props) => {
    const logic = useLogic();
    const classes = useStyles();
    const { tooltipOpen, acceptedCardsMessage } = logic;

    const AcceptedCardsTooltipText = () => (
        <Typography variant="body1">{acceptedCardsMessage}</Typography>
    );

    return (
        <Accordion expanded={props.currentValue === "card"}>
            <AccordionSummary>
                <Grid container alignItems="center">
                    <Grid item className={classes.grow}>
                        <FormControlLabel
                            control={<Radio />}
                            value="card"
                            label="Credit/Debit Card"
                        />
                    </Grid>
                    <Grid item>
                        <Grid container justify="flex-end">
                            <ClickAwayListener
                                onClickAway={logic.handleTooltipClose}
                            >
                                <Tooltip
                                    title={AcceptedCardsTooltipText()}
                                    placement="top-end"
                                    open={tooltipOpen}
                                    onClick={logic.handleTooltipClose}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                >
                                    <IconButton
                                        onClick={logic.toggleTooltipOpen}
                                        edge="end"
                                    >
                                        <HelpIcon
                                            className={
                                                classes.acceptedCardsHelpIcon
                                            }
                                        />
                                    </IconButton>
                                </Tooltip>
                            </ClickAwayListener>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                {props.paymentCardFormComponent}
            </AccordionDetails>
        </Accordion>
    );
};

export default PaymentCardRadio;
