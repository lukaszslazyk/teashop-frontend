import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        snackbar: {
            flexWrap: "nowrap",
        },
        snackbarContainer: {
            zIndex: theme.zIndex.drawer - 1,
        },
    })
);

export default useStyles;
