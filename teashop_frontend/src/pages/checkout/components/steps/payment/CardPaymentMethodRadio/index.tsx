import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
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
import { PaymentMethod } from "../../../../../../domain/order/models";
import { getPriceTextWithCurrency } from "../../../../../../shared/services/priceService";
import useLogic from "./logic";
import useStyles from "./styles";

interface Props {
    currentValue: string;
    paymentCardFormComponent: ReactNode;
    paymentMethod: PaymentMethod;
}

const CardPaymentMethodRadio = (props: Props) => {
    const logic = useLogic();
    const classes = useStyles();
    const { tooltipOpen, acceptedCardsMessage } = logic;

    const AcceptedCardsTooltipText = () => (
        <Typography variant="body1">{acceptedCardsMessage}</Typography>
    );

    return (
        <Accordion
            expanded={props.currentValue === props.paymentMethod.name}
            classes={{ root: classes.accordionRootRounded }}
        >
            <AccordionSummary
                classes={{ content: classes.accordionSummaryContent }}
            >
                <Grid container alignItems="center">
                    <Grid item className={classes.labelWrapper}>
                        <FormControlLabel
                            control={<Radio />}
                            value={props.paymentMethod.name}
                            label={props.paymentMethod.displayName}
                            className={classes.grow}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container justify="flex-end" alignItems="center">
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
                            {props.paymentMethod.fee !== 0 && (
                                <Box ml={2}>
                                    <Typography variant="body1" align="right">
                                        {getPriceTextWithCurrency(
                                            props.paymentMethod.fee
                                        )}
                                    </Typography>
                                </Box>
                            )}
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

export default CardPaymentMethodRadio;
