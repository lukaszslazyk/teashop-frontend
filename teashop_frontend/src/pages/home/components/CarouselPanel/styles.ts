import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        aspectRatioTopContainer: {
            position: "relative",
            paddingTop: "56.25%", // 16:9
            [theme.breakpoints.down("xs")]: {
                paddingTop: "75%", // 4:3
            },
        },
        aspectRatioInnerContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        card: {
            height: "100%",
        },
        media: {
            height: "100%",
        },
        mediaCaption: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            minHeight: "25%",
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5%",
            [theme.breakpoints.up("md")]: {
                padding: "3%",
            },
            backgroundColor: "black",
            color: "white",
            opacity: 0.7,
            transition: "0.3s",
            "&:hover": {
                opacity: 0.8,
                cursor: "pointer",
            },
        },
    })
);

export default useStyles;
