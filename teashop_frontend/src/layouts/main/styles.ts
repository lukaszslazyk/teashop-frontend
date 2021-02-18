import { green, red } from "@material-ui/core/colors";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const drawerMinWidth = 300;
const drawerMaxWidth = "75%";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        toolbar: theme.mixins.toolbar,
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        appBarIcon: {
            color: "white",
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
                minWidth: drawerMinWidth,
                maxWidth: drawerMaxWidth,
                flexShrink: 0,
            },
        },
        drawerPaper: {
            width: drawerMinWidth,
            maxWidth: drawerMaxWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            [theme.breakpoints.down("xs")]: {
                padding: theme.spacing(2),
            },
        },
        nestedListItem: {
            paddingLeft: theme.spacing(4),
        },
        listItemIcon: {
            marginRight: theme.spacing(1),
        },
        greenTeaIcon: {
            color: green[500],
        },
        redTeaIcon: {
            color: red[500],
        },
        herbsIcon: {
            color: green[800],
        },
        grow: {
            flexGrow: 1,
        },
    })
);

export default useStyles;
