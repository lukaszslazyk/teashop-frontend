import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: "100%",
            height: "100%",
        },
        cardActionArea: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        cardMedia: {
            width: "100%",
        },
        equalAspectRatioTopContainer: {
            position: "relative",
            paddingTop: "100%",
        },
        equalAspectRatioInnerContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        image: {
            width: "100%",
        },
        cardContent: {
            width: "100%",
        },
        cardContentInnerContainer: {
            alignContent: "flex-end",
        },
        productNameText: {
            fontSize: theme.typography.h6.fontSize,
            fontWeight: theme.typography.h6.fontWeight,
            lineHeight: theme.typography.h6.lineHeight,
            letterSpacing: theme.typography.h6.letterSpacing,
            [theme.breakpoints.down("sm")]: {
                fontSize: theme.typography.body1.fontSize,
                fontWeight: theme.typography.body1.fontWeight,
                lineHeight: theme.typography.body1.lineHeight,
                letterSpacing: theme.typography.body1.letterSpacing,
            },
        },
    })
);

export default useStyles;
