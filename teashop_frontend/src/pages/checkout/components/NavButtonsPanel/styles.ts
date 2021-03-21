import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "center",
        },
        button: {
            maxWidth: "50%",
        },
        backButtonIcon: {
            fontSize: theme.typography.button.fontSize,
            marginRight: theme.spacing(1),
        },
        forwardButtonIcon: {
            fontSize: theme.typography.button.fontSize,
            marginLeft: theme.spacing(1),
        },
    })
);

export default useStyles;
