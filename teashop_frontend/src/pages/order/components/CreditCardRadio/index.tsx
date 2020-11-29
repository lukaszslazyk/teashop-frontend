import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControlLabel,
    Radio,
} from "@material-ui/core";
import React from "react";
import CreditCardFormContainer from "../CreditCardForm/container";

interface Props {
    currentValue: string;
}

const CreditCardRadio = (props: Props) => (
    <Accordion expanded={props.currentValue === "creditCard"}>
        <AccordionSummary>
            <FormControlLabel
                control={<Radio />}
                value="creditCard"
                label="Credit card"
            />
        </AccordionSummary>
        <AccordionDetails>
            <CreditCardFormContainer />
        </AccordionDetails>
    </Accordion>
);

export default CreditCardRadio;
