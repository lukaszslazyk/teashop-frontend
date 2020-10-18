import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        toolbar: theme.mixins.toolbar,
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        logoIcon: {
            marginRight: theme.spacing(1),
        },
        titleLink: {
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontWeight: theme.typography.h6.fontWeight,
            color: theme.palette.primary.contrastText,
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    })
);

export default useStyles;
