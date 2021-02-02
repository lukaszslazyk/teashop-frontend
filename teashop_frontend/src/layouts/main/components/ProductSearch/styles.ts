import {
    Theme,
    createStyles,
    makeStyles,
    fade,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchIcon: {
            color: "white",
        },
        searchField: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.25),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: "auto",
            },
        },
        searchFieldIcon: {
            padding: theme.spacing(0, 2),
            position: "absolute",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        searchFieldInputRoot: {
            color: "white",
        },
        searchFieldInput: {
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(6),
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: 0,
                "&:focus": {
                    width: "20ch",
                },
            },
        },
    })
);

export default useStyles;
