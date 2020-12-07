import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: theme.spacing(3),
        },
        imageContainer: {
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: theme.spacing(1),
        },
        image: {
            width: "100%",
        },
        contentContainer: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            marginLeft: theme.spacing(1),
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            [theme.breakpoints.up("md")]: {
                flexWrap: "nowrap",
            },
        },
        titlePartContainer: {
            flexGrow: 1,
            flexWrap: "nowrap",
            alignItems: "center",
        },
        bodyPartContainer: {
            justifyContent: "flex-end",
            alignItems: "center",
            [theme.breakpoints.up("md")]: {
                flexWrap: "nowrap",
            },
        },
        productNameTextContainer: {
            flexGrow: 1,
            wordBreak: "break-word",
        },
        productNameText: {
            color: "black",
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline",
            }
        },
        mobileMenuContainer: {
            alignSelf: "flex-start",
        },
        valueText: {
            whiteSpace: "nowrap",
            fontSize: "1.05rem",
        },
    })
);

export default useStyles;
