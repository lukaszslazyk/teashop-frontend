import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        totalPriceText: {
            textAlign: "right",
            [theme.breakpoints.down("sm")]: {
                textAlign: "center",
            },
        },
        checkoutButtonContainer: {
            justifyContent: "flex-end",
            [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
            },
        },
    })
);

export default useStyles;
