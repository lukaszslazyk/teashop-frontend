import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        valueNameText: {
            [theme.breakpoints.up("xs")]: {
                textAlign: "right",
            },
            [theme.breakpoints.down("xs")]: {
                textAlign: "left",
            },
        },
        valueText: {
            textAlign: "right",
            whiteSpace: "nowrap",
        },
    })
);

export default useStyles;
