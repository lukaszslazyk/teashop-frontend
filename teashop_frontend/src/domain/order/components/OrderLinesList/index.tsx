import { Box, Divider, Grid } from "@material-ui/core";
import React from "react";
import { OrderLine } from "../../models";
import OrderLinesListElement from "../OrderLinesListElement";

interface Props {
    orderLines: OrderLine[];
}

const OrderLinesList = (props: Props) => (
    <div>
        {props.orderLines.map((line, index) => (
            <Grid key={line.product.id} container>
                <Grid item xs={12}>
                    <Box my={1}>
                        <Divider />
                    </Box>
                </Grid>
                <OrderLinesListElement orderLine={line} />
                {index === props.orderLines.length - 1 && (
                    <Grid item xs={12}>
                        <Box my={1}>
                            <Divider />
                        </Box>
                    </Grid>
                )}
            </Grid>
        ))}
    </div>
);

export default OrderLinesList;
