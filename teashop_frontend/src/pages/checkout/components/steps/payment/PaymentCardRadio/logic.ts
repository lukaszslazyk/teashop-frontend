import { useState } from "react";
import { getAcceptedPaymentCardIssuers } from "../../../../../../domain/order/services/orderService";

const useLogic = () => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const acceptedCardIssuers = getAcceptedPaymentCardIssuers();
    const acceptedCardsMessage = `We accept
        ${acceptedCardIssuers
        .slice(0, acceptedCardIssuers.length - 1)
        .join(", ")}
        and
        ${acceptedCardIssuers[acceptedCardIssuers.length - 1]}
        cards`;

    const toggleTooltipOpen = () => setTooltipOpen(tooltipOpen => !tooltipOpen);

    const handleTooltipClose = () => setTooltipOpen(false);

    return {
        tooltipOpen,
        acceptedCardsMessage,
        toggleTooltipOpen,
        handleTooltipClose,
    };
};

export default useLogic;
