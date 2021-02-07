import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            marginBottom: theme.spacing(1),
        },
        suppliedHeader: {
            flexGrow: 1,
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(3),
        },
        paginationContainer: {
            marginTop: theme.spacing(3),
        },
        sortOptionSelectContainer: {
            minWidth: 175,
        },
    })
);

export default useStyles;
