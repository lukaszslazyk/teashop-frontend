import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up("sm")]: {
                marginTop: theme.spacing(5),
            }
        },
        statusIconContainer: {
            display: "flex",
            justifyContent: "center",
        },
        progress: {
            marginBottom: theme.spacing(2),
        },
        successIcon: {
            color: theme.palette.primary.main,
            fontSize: 100,
        },
        failIcon: {
            color: theme.palette.error.main,
            fontSize: 100,
        },
        link: {
            textDecoration: "none",
        },
        backToMainPageButton: {
            marginTop: theme.spacing(1),
        },
    })
);

export default useStyles;
