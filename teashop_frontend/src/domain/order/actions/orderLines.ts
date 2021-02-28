import { OrderLine } from "../models";

export const SET_ORDER_LINES = "SET_ORDER_LINES";

interface SetOrderLinesAction {
    type: typeof SET_ORDER_LINES;
    orderLines: OrderLine[];
}

export type OrderLinesActionTypes = SetOrderLinesAction;

export const setOrderLines = (
    orderLines: OrderLine[]
): OrderLinesActionTypes => ({
    type: SET_ORDER_LINES,
    orderLines: orderLines,
});
