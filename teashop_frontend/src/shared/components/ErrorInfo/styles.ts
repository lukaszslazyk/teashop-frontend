import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
        },
        titleText: {
            marginBottom: theme.spacing(1),
            fontSize: theme.typography.h3.fontSize,
            fontWeight: theme.typography.h3.fontWeight,
            lineHeight: theme.typography.h3.lineHeight,
            letterSpacing: theme.typography.h3.letterSpacing,
            [theme.breakpoints.down("xs")]: {
                fontSize: theme.typography.h4.fontSize,
                fontWeight: theme.typography.h4.fontWeight,
                lineHeight: theme.typography.h4.lineHeight,
                letterSpacing: theme.typography.h4.letterSpacing,
            },
        },
        secondaryText: {
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
        backToHomeButton: {
            marginTop: theme.spacing(2),
        },
    })
);

export default useStyles;
