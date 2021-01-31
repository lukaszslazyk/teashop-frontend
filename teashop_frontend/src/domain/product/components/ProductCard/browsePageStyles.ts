import { makeStyles } from "@material-ui/core";

const useBrowsePageStyles = makeStyles({
    card: {
        width: 250,
        height: "100%",
    },
    cardHomePage: {
        width: 227,
        height: "100%",
    },
    cardMedia: {
        height: 200,
    },
    cardMediaHomePage: {
        height: 175,
    },
    cardActionArea: {
        height: "100%",
    },
    cardContent: {
        height: "calc(100% - 200px)",
    },
    cardContentHomePage: {
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

export default useBrowsePageStyles;
