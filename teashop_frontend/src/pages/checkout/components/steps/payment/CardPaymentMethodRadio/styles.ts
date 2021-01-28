import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        accordionRootRounded: {
            borderRadius: 4,
        },
        accordionSummaryContent: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        labelWrapper: {
            display: "flex",
            flexGrow: 1,
        },
        grow: {
            flexGrow: 1,
        },
        acceptedCardsHelpIcon: {
            color: grey[500],
        },
    })
);

export default useStyles;
