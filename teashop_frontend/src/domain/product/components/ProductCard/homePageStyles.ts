import { makeStyles } from "@material-ui/core";

const useHomePageStyles = makeStyles({
    card: {
        width: 227,
        height: "100%",
    },
    cardMedia: {
        height: 175,
    },
    cardActionArea: {
        height: "100%",
    },
    cardContent: {
        height: "calc(100% - 175px)",
    },
    cardContentInnerContainer: {
        height: "100%",
        alignContent: "flex-end",
    },
    grow: {
        flexGrow: 1,
    },
});

export default useHomePageStyles;
