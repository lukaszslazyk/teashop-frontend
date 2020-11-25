import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        priceInfoPaper: {
            padding: theme.spacing(2),
        },
    })
);

export default useStyles;
