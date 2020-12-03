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
import React from "react";
import { getAcceptedCreditCardIssuers } from "../../../../domain/order/services/orderService";
import CreditCardFormContainer from "../CreditCardForm/container";
import useStyles from "./styles";

interface Props {
    currentValue: string;
}

const CreditCardRadio = (props: Props) => {
    const classes = useStyles();

    const acceptedCardIssuers = getAcceptedCreditCardIssuers();
    const acceptedCardsInfo =
        `We accept ${
            acceptedCardIssuers
                .slice(0, acceptedCardIssuers.length - 1)
                .join(", ")
        } and ${
            acceptedCardIssuers[acceptedCardIssuers.length - 1]
        } cards`;

    return (
        <Accordion expanded={props.currentValue === "creditCard"}>
            <AccordionSummary>
                <Grid container alignItems="center">
                    <Grid item className={classes.grow}>
                        <FormControlLabel
                            control={<Radio />}
                            value="creditCard"
                            label="Credit card"
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
                <CreditCardFormContainer />
            </AccordionDetails>
        </Accordion>
    );
};

export default CreditCardRadio;
