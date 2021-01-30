import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        width: 250,
        height: "100%",
    },
    cardMedia: {
        height: 200,
    },
    cardActionArea: {
        height: "100%",
    },
    cardContent: {
        height: "calc(100% - 200px)",
    },
    cardContentInnerContainer: {
        height: "100%",
        alignContent: "flex-end",
    },
    grow: {
        flexGrow: 1,
    },
});

export default useStyles;
