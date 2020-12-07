import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControlLabel,
    Grid,
    Radio,
    Tooltip,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import React, { ReactNode } from "react";
import { getAcceptedPaymentCardIssuers } from "../../../../domain/order/services/orderService";
import useStyles from "./styles";

interface Props {
    currentValue: string;
    paymentCardFormComponent: ReactNode;
}

const PaymentCardRadio = (props: Props) => {
    const classes = useStyles();

    const acceptedCardIssuers = getAcceptedPaymentCardIssuers();
    const acceptedCardsInfo =
        `We accept ${
            acceptedCardIssuers
                .slice(0, acceptedCardIssuers.length - 1)
                .join(", ")
        } and ${
            acceptedCardIssuers[acceptedCardIssuers.length - 1]
        } cards`;

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
                            <Tooltip title={acceptedCardsInfo} placement="top-end">
                                <HelpIcon
                                    className={classes.acceptedCardsHelpIcon}
                                />
                            </Tooltip>
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
