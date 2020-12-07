import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        itemContainer: {
            flexWrap: "nowrap",
        },
        imageContainer: {
            display: "flex",
            alignItems: "center",
        },
        image: {
            width: 50,
        },
        grow: {
            flexGrow: 1,
        },
        quantityText: {
            marginRight: theme.spacing(2),
            whiteSpace: "nowrap",
            [theme.breakpoints.up("xs")]: {
                textAlign: "right",
            },
            [theme.breakpoints.down("xs")]: {
                textAlign: "left",
            },
        },
        priceText: {
            whiteSpace: "nowrap",
            textAlign: "right",
        },
    })
);

export default useStyles;
