import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
        },
        quantityInput: {
            width: 75,
            "& input": {
                textAlign: "center",
            },
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        },
        errorPaper: {
            color: theme.palette.error.dark,
            padding: theme.spacing(1),
            zIndex: 1
        },
    })
);

export default useStyles;
