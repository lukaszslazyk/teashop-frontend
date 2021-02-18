import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
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
        titleText: {
            textAlign: "center",
            fontSize: theme.typography.h4.fontSize,
            fontWeight: theme.typography.h4.fontWeight,
            lineHeight: theme.typography.h4.lineHeight,
            letterSpacing: theme.typography.h4.letterSpacing,
            [theme.breakpoints.down("xs")]: {
                fontSize: theme.typography.h5.fontSize,
                fontWeight: theme.typography.h5.fontWeight,
                lineHeight: theme.typography.h5.lineHeight,
                letterSpacing: theme.typography.h5.letterSpacing,
            },
        },
        secondaryText: {
            textAlign: "center",
            fontSize: theme.typography.h6.fontSize,
            fontWeight: theme.typography.h6.fontWeight,
            lineHeight: theme.typography.h6.lineHeight,
            letterSpacing: theme.typography.h6.letterSpacing,
            [theme.breakpoints.down("xs")]: {
                fontSize: theme.typography.body1.fontSize,
                fontWeight: theme.typography.body1.fontWeight,
                lineHeight: theme.typography.body1.lineHeight,
                letterSpacing: theme.typography.body1.letterSpacing,
            },
        },
    })
);

export default useStyles;
